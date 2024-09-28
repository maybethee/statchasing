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
    @options[:query]['replay-date-before'] = @player.last_after_date.utc.iso8601 if @player.last_after_date
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

    # update the player's last_after_date if new replays fetched
    if replays.any?
      # use oldest replay date as the new last_after_date
      oldest_replay_date = replays.min_by { |replay| replay['date'] }['date']
      Rails.logger.debug("Oldest replay date: #{oldest_replay_date}")

      # Update the player's last_after_date and save it in the database
      @player.update(last_after_date: oldest_replay_date)
      Rails.logger.debug("Updated last_after_date to: #{oldest_replay_date}")

      # # Reload the player object to reflect the updated value
      # @player.reload
      # Rails.logger.debug("Now player's last after date is: #{@player.last_after_date.inspect}")
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
