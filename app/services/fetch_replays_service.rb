class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize(player_id:, after_date: '2024-09-24T00:00:00Z')
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

  # replay-date-before should only get added when admin calls
  def fetch_all_replays(sync_to_present = false)
    Rails.logger.debug("Sync is?: #{sync_to_present}")
    if sync_to_present &&
       Rails.logger.debug('sync conditional triggered')
      newest_replay = @player.replays.max_by { |replay| replay['date'] }['date'] if @player.replays.empty?
      Rails.logger.debug("newest replay: #{newest_replay.inspect}")
      # investigate newest_replay, it was coming up nil before but i'm not sure why, and syncing player would skip some days, not sure if it was because replays were from the same day that replay-date-after was changed to?
      @options[:query]['replay-date-after'] = newest_replay if newest_replay

      # Rails.logger.debug("today's date: #{Date.today.to_time.utc.iso8601}")
      # @options[:query]['replay-date-before'] = Date.today.to_time.utc.iso8601
    elsif !sync_to_present && @player.last_after_date
      @options[:query]['replay-date-before'] = @player.last_after_date.utc.iso8601
    end

    Rails.logger.debug("current query options: #{@options}")
    replays = []
    next_url = '/replays'

    loop do
      response = fetch_and_log_replays(next_url)
      break if response.nil? || response.empty?

      new_replays = filter_new_replays(response['list'])
      break if new_replays.empty?

      save_replays(new_replays)
      replays.concat(new_replays)
      next_url = response['next']
      break if next_url.nil?
    end

    # update the player's last_after_date and last_before_date if new replays fetched
    if replays.any?
      # use oldest replay date as the new last_after_date
      oldest_replay_date = replays.min_by { |replay| replay['date'] }['date']
      Rails.logger.debug("Oldest replay date: #{oldest_replay_date}")
      @player.update(last_after_date: oldest_replay_date)
      Rails.logger.debug("Updated last_after_date to: #{oldest_replay_date}")
      Rails.logger.debug("Now player's last after date is: #{@player.last_after_date.inspect}")

      # newest_replay_date = replays.max_by { |replay| replay['date'] }['date']
      # @player.update(last_before_date: newest_replay_date)
    else
      Rails.logger.debug('No new replays were fetched.')
    end

    replays
  end

  private

  def fetch_replays(url)
    Rails.logger.debug("query options: #{@options[:query]}")
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

  def save_replay_stats(replay, stats)
    replay.replay_stats.create(stats:)
  end
end
