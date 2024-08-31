class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize
    @options = {
      headers: { 'Authorization' => ENV['API_AUTH_TOKEN'].to_s },
      query: {
        'player-name': 'BijouBug',
        'playlist': 'ranked-doubles',
        'count': 20
      }
    }
    @rate_limit = 0.1
  end

  def fetch_replays
    response = self.class.get('/replays', @options)
    Rails.logger.debug("Response: #{response.body}")
    if response.success?
      save_replays(response.parsed_response)
    else
      Rails.logger.error("Failed to fetch data: #{response.message}")
    end
  end

  def fetch_replay_stats(replay_id)
    sleep(@rate_limit)

    response = self.class.get("/replays/#{replay_id}", @options)
    Rails.logger.debug("Response: #{response.body}")

    if response.success?
      replay_stats = response.parsed_response
      save_replay_stats(replay_id, replay_stats)
    else
      Rails.logger.error("Failed to fetch replay stats: #{response.message}")
    end
  end

  private

  def save_replays(replays)
    replays['list'].each do |replay|
      replay_id = replay['id']
      winning_team = find_winner(replay)
      Replay.create(data: replay, replay_id:, winning_team:)
      fetch_replay_stats(replay_id)
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
