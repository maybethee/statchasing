class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize
    @options = {
      headers: { 'Authorization' => ENV['API_AUTH_TOKEN'].to_s },
      query: {
        'player-id': 'steam:76561198136291441',
        'playlist': %w[ranked-doubles ranked-standard ranked-duels]
        # 'playlist': 'ranked-doubles'
        # 'count':
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
    stop_date = '2024-08-26T00:00:00Z'

    loop do
      response = fetch_replays(last_replay_date)
      Rails.logger.debug("Raw Response: #{response.inspect}")

      if response.nil? || response.empty?
        Rails.logger.error('Empty or nil response received')
        break
      end

      # remove nil values
      response.compact!

      replays.concat(response)
      Rails.logger.debug("Replays after concat: #{replays.inspect}")

      last_replay_date = response.last['created']
      Rails.logger.debug("Last Replay Date: #{last_replay_date}")

      # adjust last_replay_date to avoid processing same replay twice
      last_replay_date = (Time.parse(last_replay_date) - 1).utc.iso8601 if last_replay_date

      # last_replay_date reaches stop_date
      break if last_replay_date && last_replay_date <= stop_date

      sleep(@rate_limit)
    end

    replays.each do |replay|
      next if replay.nil?

      replay_id = replay['id']
      winning_team = find_winner(replay)
      Replay.create(data: replay, replay_id:, winning_team:)
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

  def fetch_replays(before_date = nil)
    options = @options.dup
    options[:query]['created-before'] = before_date if before_date

    response = self.class.get('/replays', options)
    # Rails.logger.debug("Response: #{response.body}")

    if response.success?
      response.parsed_response['list']
    else
      Rails.logger.error("Failed to fetch data: #{response.message}")
      []
    end
  end

  def find_winner(replay)
    blue_goals = replay.dig('blue', 'goals') || 0
    orange_goals = replay.dig('orange', 'goals') || 0
    blue_goals > orange_goals ? 'blue' : 'orange'
  end

  def save_replay_stats(replay_id, stats)
    replay = Replay.find_by(replay_id:)
    replay.replay_stats.create(stats:) if replay
  end
end
