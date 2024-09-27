class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize(player_id:, after_date: '2024-09-14T00:00:00Z')
    @player = Player.find_by(player_id:)
    @options = {
      headers: { 'Authorization' => ENV['API_AUTH_TOKEN'].to_s },
      query: {
        'player-id': player_id,
        'playlist': %w[ranked-doubles ranked-standard ranked-duels],
        'replay-date-after': after_date
      }
    }
    @rate_limit = 0.2
  end

  def fetch_some_replays
    response = self.class.get('/replays', @options)
    Rails.logger.debug("Response: #{response.body}")
    if response.success?
      save_replays(response.parsed_response)
    else
      Rails.logger.error("Failed to fetch data: #{response.message}")
    end
  end

  def fetch_replay_stats(replay_id, retries = 3)
    sleep(@rate_limit)

    response = self.class.get("/replays/#{replay_id}", @options)
    # Rails.logger.debug("Response: #{response.body}")

    if response.success?
      response.parsed_response

    elsif response.code == 429 && retries.positive?
      Rails.logger.warn("Rate limit hit, retrying... (#{retries} retries left)")

      # retry after 2s
      sleep(2)

      fetch_replay_stats(replay_id, retries - 1)
    else
      Rails.logger.error("Failed to fetch replay stats: #{response.message}")
      nil
    end
  end

  def fetch_all_replays
    last_after_date = @player.last_after_date

    Rails.logger.debug("Last after date for player #{@player.id}: #{last_after_date.inspect}")

    if last_after_date
      @options[:query]['replay-date-before'] = last_after_date
    else
      Rails.logger.debug("Using default after_date: #{@options[:query]['replay-date-after']}")
    end

    replays = []
    next_url = '/replays'

    loop do
      response = fetch_and_log_replays(next_url)
      break if response.nil? || response.empty?

      new_replays = filter_new_replays(response['list'])
      break if new_replays.empty?

      save_replays(new_replays)
      replays.concat(new_replays) # Collect the fetched replays
      next_url = response['next']
      break if next_url.nil?
    end

    # Update the player's last_after_date if we fetched any new replays
    if replays.any?
      # Use the most recent replay date as the new last_after_date
      latest_replay_date = replays.max_by { |replay| replay['date'] }['date']

      # Update the player's last_after_date and save it in the database
      @player.update(last_after_date: latest_replay_date)
      Rails.logger.debug("Updated last_after_date to: #{latest_replay_date}")
    else
      Rails.logger.debug('No new replays were fetched.')
    end

    replays
  end

  private

  # def fetch_all_replays
  #   existing_match_guids = @player.replays.pluck(:match_guid).to_set
  #   replays = []
  #   fetched_replay_ids = Set.new
  #   fetched_match_guids = Set.new
  #   allowed_playlists = %w[ranked-doubles ranked-standard ranked-duels]
  #   next_url = '/replays'

  #   loop do
  #     response = fetch_and_log_replays(next_url)
  #     break if response.nil? || response.empty?

  #     saved_match_guids = @player.replays.pluck(:match_guid)

  #     new_replays = filter_new_replays(response['list'], saved_match_guids, allowed_playlists)
  #     break if new_replays.empty?

  #     # new_replays = filter_new_replays(response['list'], fetched_replay_ids, allowed_playlists)
  #     # break if new_replays.empty?

  #     replays.concat(new_replays)
  #     # update_fetched_replay_ids(new_replays, fetched_replay_ids)
  #     next_url = response['next']
  #     break if next_url.nil?
  #   end

  #   Rails.logger.debug("Total replays fetched: #{replays.size}")
  #   save_replays_and_fetch_stats(replays, existing_match_guids)
  # end

  def fetch_replays(url)
    response = self.class.get(url, @options)
    Rails.logger.debug("Fetching replays from URL: #{url}")
    Rails.logger.debug("Response: #{response.body}")

    if response.success?
      response.parsed_response
    else
      Rails.logger.error("Failed to fetch data: #{response.message}")
      nil
    end
  end

  def fetch_and_log_replays(url)
    Rails.logger.debug("Fetching replays from URL: #{url}")
    response = fetch_replays(url)
    Rails.logger.debug("Raw Response: #{response.inspect}")
    response
  end

  def filter_new_replays(response)
    allowed_playlists = %w[ranked-doubles ranked-standard ranked-duels]
    response.reject { |replay| !allowed_playlists.include?(replay['playlist_id']) }
  end

  # def filter_new_replays(response, fetched_replay_ids, allowed_playlists)
  #   response.reject do |replay|
  #     replay_id = replay['id']
  #     playlist = replay['playlist_id']
  #     fetched_replay_ids.include?(replay_id) || !allowed_playlists.include?(playlist)
  #   end
  # end

  def update_fetched_replay_ids(new_replays, fetched_replay_ids)
    new_replays.each do |replay|
      fetched_replay_ids.add(replay['id'])
      Rails.logger.debug("Added replay: #{replay['id']} with date: #{replay['created']}")
    end
  end

  def save_replays(replays)
    replays.each do |replay|
      next if replay.nil?

      replay_id = replay['id']
      replay_stats = fetch_replay_stats(replay_id)
      next if replay_stats.nil?

      saved_replay = @player.replays.create(
        data: replay,
        replay_id:
      )

      save_replay_stats(saved_replay, replay_stats)
    end
  end

  # def save_replays_and_fetch_stats(replays, existing_match_guids)
  #   replays.each do |replay|
  #     next if replay.nil?

  #     replay_id = replay['id']
  #     replay_stats = fetch_replay_stats(replay_id)
  #     next if replay_stats.nil?

  #     match_guid = replay_stats['match_guid']
  #     next if existing_match_guids.include?(match_guid)

  #     existing_match_guids.add(match_guid)
  #     Rails.logger.debug("Added match GUID: #{match_guid}")

  #     saved_replay = @player.replays.create(
  #       data: replay,
  #       replay_id:,
  #       match_guid:
  #     )

  #     save_replay_stats(saved_replay, replay_stats)
  #   end
  # end

  def save_replay_stats(replay, stats)
    replay.replay_stats.create(stats:)
  end
end
