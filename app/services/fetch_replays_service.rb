class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize(player_id:)
    @player = Player.find_by(player_id:)
    @options = {
      headers: { 'Authorization' => ENV['API_AUTH_TOKEN'].to_s },
      query: {
        # 'player-id': player_id,
        'uploader': 76_561_198_136_291_441, # use uploader to prevent duplicate games uploaded by different players from being included
        'playlist': %w[ranked-doubles ranked-standard ranked-duels]
        # 'playlist': 'ranked-doubles'
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
      replay_stats = response.parsed_response
      save_replay_stats(replay_id, replay_stats)
    elsif response.code == 429 && retries.positive?
      Rails.logger.warn("Rate limit hit, retrying... (#{retries} retries left)")

      # retry after 2s
      sleep(2)

      fetch_replay_stats(replay_id, retries - 1)
    else
      Rails.logger.error("Failed to fetch replay stats: #{response.message}")
    end
  end

  def fetch_all_replays
    replays = []
    last_replay_date = nil
    stop_date = '2024-08-20T00:00:00Z'
    fetched_replay_ids = Set.new
    per_page = 200
    allowed_playlists = %w[ranked-doubles ranked-standard ranked-duels]

    loop do
      response = fetch_and_log_replays(last_replay_date, per_page)
      break if response.nil? || response.empty?

      new_replays = filter_new_replays(response, stop_date, fetched_replay_ids, allowed_playlists)
      break if new_replays.empty?

      replays.concat(new_replays)
      update_fetched_replay_ids(new_replays, fetched_replay_ids)
      last_replay_date = update_last_replay_date(new_replays)
      break if last_replay_date && last_replay_date <= stop_date
    end

    Rails.logger.debug("Total replays fetched: #{replays.size}")
    save_replays_and_fetch_stats(replays)
  end

  private

  def fetch_replays(after_date = nil, per_page = 200)
    options = @options.dup
    options[:query]['replay-date-after'] = after_date if after_date
    options[:query]['count'] = per_page

    response = self.class.get('/replays', options)
    Rails.logger.debug("Fetching replays after date: #{after_date}")
    Rails.logger.debug("Response: #{response.body}")

    if response.success?
      response.parsed_response['list']
    else
      Rails.logger.error("Failed to fetch data: #{response.message}")
      []
    end
  end

  def fetch_and_log_replays(last_replay_date, per_page)
    Rails.logger.debug("Fetching replays after date: #{last_replay_date}")
    response = fetch_replays(last_replay_date, per_page)
    Rails.logger.debug("Raw Response: #{response.inspect}")
    response
  end

  def filter_new_replays(response, stop_date, fetched_replay_ids, allowed_playlists)
    response.reject do |replay|
      replay_date = replay['created']
      replay_id = replay['id']
      playlist = replay['playlist_id']
      replay_date.nil? || replay_date <= stop_date || fetched_replay_ids.include?(replay_id) || !allowed_playlists.include?(playlist)
    end
  end

  def update_fetched_replay_ids(new_replays, fetched_replay_ids)
    new_replays.each do |replay|
      fetched_replay_ids.add(replay['id'])
      Rails.logger.debug("Added replay: #{replay['id']} with date: #{replay['created']}")
    end
  end

  def update_last_replay_date(new_replays)
    last_replay_date = new_replays.last['created']
    (Time.parse(last_replay_date) - 1).utc.iso8601 if last_replay_date
  end

  def save_replays_and_fetch_stats(replays)
    replays.each do |replay|
      next if replay.nil?

      replay_id = replay['id']
      @player.replays.create(data: replay, replay_id:)
      fetch_replay_stats(replay_id)
    end
  end

  def save_replay_stats(replay_id, stats)
    replay = Replay.find_by(replay_id:)
    replay.replay_stats.create(stats:) if replay
  end
end
