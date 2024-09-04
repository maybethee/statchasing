class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize(player_id:)
    @player = Player.find_by(player_id:)
    @options = {
      headers: { 'Authorization' => ENV['API_AUTH_TOKEN'].to_s },
      query: {
        # 'player-id': player_id,
        'uploader': 76_561_198_136_291_441,
        # 'playlist': %w[ranked-doubles ranked-standard ranked-duels]
        'playlist': 'ranked-doubles'
        # 'count': 6
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

  def fetch_all_replays
    replays = []
    last_replay_date = nil
    stop_date = '2024-08-27T00:00:00Z'
    previous_last_replay_date = nil

    loop do
      # Rails.logger.debug("Fetching replays after date: #{last_replay_date}")
      response = fetch_replays(last_replay_date)
      # Rails.logger.debug("Raw Response: #{response.inspect}")

      if response.nil? || response.empty?
        Rails.logger.error('Empty or nil response received')
        break
      end

      response.compact!

      response.each do |replay|
        replay_date = replay['created']
        next if replay_date.nil? || replay_date <= stop_date

        replays << replay
        last_replay_date = replay_date
      end

      # adjust last_replay_date to avoid processing same replay twice
      last_replay_date = (Time.parse(last_replay_date) - 1).utc.iso8601 if last_replay_date

      # last_replay_date reaches stop_date
      break if last_replay_date && last_replay_date <= stop_date

      # breka if no new replays are fetched
      break if last_replay_date == previous_last_replay_date

      previous_last_replay_date = last_replay_date

      sleep(@rate_limit)
    end

    # Rails.logger.debug("Total replays fetched: #{replays.size}")

    replays.each do |replay|
      next if replay.nil?

      replay_id = replay['id']
      @player.replays.create(data: replay, replay_id:)
      fetch_replay_stats(replay_id)
    end
  end

  def fetch_replay_stats(replay_id, retries = 3)
    sleep(@rate_limit)

    response = self.class.get("/replays/#{replay_id}", @options)
    # Rails.logger.debug("Response: #{response.body}")

    if response.success?
      replay_stats = response.parsed_response
      save_replay_stats(replay_id, replay_stats)
    elsif response.code == 429 && retries > 0
      Rails.logger.warn("Rate limit hit, retrying... (#{retries} retries left)")

      # retry after 2s
      sleep(2)

      fetch_replay_stats(replay_id, retries - 1)
    else
      Rails.logger.error("Failed to fetch replay stats: #{response.message}")
    end
  end

  private

  def fetch_replays(after_date = nil)
    options = @options.dup
    if after_date
      options[:query]['replay-date-after
'] = after_date
    end

    response = self.class.get('/replays', options)
    Rails.logger.debug("Response: #{response.body}")

    if response.success?
      response.parsed_response['list']
    else
      Rails.logger.error("Failed to fetch data: #{response.message}")
      []
    end
  end

  def save_replay_stats(replay_id, stats)
    replay = Replay.find_by(replay_id:)
    replay.replay_stats.create(stats:) if replay
  end
end
