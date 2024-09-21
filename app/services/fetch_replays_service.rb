# class FetchReplaysService
#   include HTTParty
#   base_uri ENV['API_BASE_URL']

#   def initialize(player_id:)
#     @player = Player.find_by(player_id:)
#     @options = {
#       headers: { 'Authorization' => ENV['API_AUTH_TOKEN'].to_s },
#       query: {
#         # 'uploader': 76_561_198_136_291_441, # use uploader to prevent duplicate games uploaded by different players from being included
#         'player-id': player_id,
#         'playlist': %w[ranked-doubles ranked-standard ranked-duels]
#       }
#     }
#     @rate_limit = 0.2
#   end

#   def fetch_some_replays
#     response = self.class.get('/replays', @options)
#     Rails.logger.debug("Response: #{response.body}")
#     if response.success?
#       save_replays(response.parsed_response)
#     else
#       Rails.logger.error("Failed to fetch data: #{response.message}")
#     end
#   end

#   def fetch_replay_stats(replay_id, retries = 3)
#     sleep(@rate_limit)

#     response = self.class.get("/replays/#{replay_id}", @options)
#     # Rails.logger.debug("Response: #{response.body}")

#     if response.success?
#       response.parsed_response

#     elsif response.code == 429 && retries.positive?
#       Rails.logger.warn("Rate limit hit, retrying... (#{retries} retries left)")

#       # retry after 2s
#       sleep(2)

#       fetch_replay_stats(replay_id, retries - 1)
#     else
#       Rails.logger.error("Failed to fetch replay stats: #{response.message}")
#       nil
#     end
#   end

#   def fetch_all_replays
#     replays = []
#     last_replay_date = nil
#     stop_date = '2024-08-20T00:00:00Z'
#     fetched_replay_ids = Set.new
#     fetched_match_guids = Set.new
#     per_page = 200
#     allowed_playlists = %w[ranked-doubles ranked-standard ranked-duels]

#     loop do
#       response = fetch_and_log_replays(last_replay_date, per_page)
#       break if response.nil? || response.empty?

#       new_replays = filter_new_replays(response, stop_date, fetched_replay_ids, allowed_playlists)
#       break if new_replays.empty?

#       replays.concat(new_replays)
#       update_fetched_replay_ids(new_replays, fetched_replay_ids)
#       last_replay_date = update_last_replay_date(new_replays)
#       break if last_replay_date && last_replay_date <= stop_date
#     end

#     Rails.logger.debug("Total replays fetched: #{replays.size}")
#     save_replays_and_fetch_stats(replays, fetched_match_guids)
#   end

#   private

#   def fetch_replays(after_date = nil, per_page = 200)
#     options = @options.dup
#     options[:query]['replay-date-after'] = after_date if after_date
#     options[:query]['count'] = per_page

#     response = self.class.get('/replays', options)
#     Rails.logger.debug("Fetching replays after date: #{after_date}")
#     Rails.logger.debug("Response: #{response.body}")

#     if response.success?
#       response.parsed_response['list']
#     else
#       Rails.logger.error("Failed to fetch data: #{response.message}")
#       []
#     end
#   end

#   def fetch_and_log_replays(last_replay_date, per_page)
#     Rails.logger.debug("Fetching replays after date: #{last_replay_date}")
#     response = fetch_replays(last_replay_date, per_page)
#     Rails.logger.debug("Raw Response: #{response.inspect}")
#     response
#   end

#   def filter_new_replays(response, stop_date, fetched_replay_ids, allowed_playlists)
#     response.reject do |replay|
#       replay_date = replay['created']
#       replay_id = replay['id']
#       playlist = replay['playlist_id']
#       replay_date.nil? || replay_date <= stop_date || fetched_replay_ids.include?(replay_id) || !allowed_playlists.include?(playlist)
#     end
#   end

#   def update_fetched_replay_ids(new_replays, fetched_replay_ids)
#     new_replays.each do |replay|
#       fetched_replay_ids.add(replay['id'])
#       Rails.logger.debug("Added replay: #{replay['id']} with date: #{replay['created']}")
#     end
#   end

#   def update_last_replay_date(new_replays)
#     last_replay_date = new_replays.last['created']
#     (Time.parse(last_replay_date) - 1).utc.iso8601 if last_replay_date
#   end

#   def save_replays_and_fetch_stats(replays, fetched_match_guids)
#     replays.each do |replay|
#       next if replay.nil?

#       replay_id = replay['id']
#       replay_stats = fetch_replay_stats(replay_id)
#       next if replay_stats.nil?

#       match_guid = replay_stats['match_guid']
#       next if fetched_match_guids.include?(match_guid)

#       fetched_match_guids.add(match_guid)
#       Rails.logger.debug("Added match GUID: #{match_guid}")

#       saved_replay = @player.replays.create(data: replay, replay_id:)
#       save_replay_stats(saved_replay, replay_stats)
#     end
#   end

#   def save_replay_stats(replay, stats)
#     replay.replay_stats.create(stats:)
#   end
# end
#

# next commmit: "Revert to using native next url to fetch more than 200 replays"

class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize(player_id:, after_date: '2024-08-12T00:00:00Z')
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
    replays = []
    fetched_replay_ids = Set.new
    fetched_match_guids = Set.new
    allowed_playlists = %w[ranked-doubles ranked-standard ranked-duels]
    next_url = '/replays'

    loop do
      response = fetch_and_log_replays(next_url)
      break if response.nil? || response.empty?

      new_replays = filter_new_replays(response['list'], fetched_replay_ids, allowed_playlists)
      break if new_replays.empty?

      replays.concat(new_replays)
      update_fetched_replay_ids(new_replays, fetched_replay_ids)
      next_url = response['next']
      break if next_url.nil?
    end

    Rails.logger.debug("Total replays fetched: #{replays.size}")
    save_replays_and_fetch_stats(replays, fetched_match_guids)
  end

  private

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

  def filter_new_replays(response, fetched_replay_ids, allowed_playlists)
    response.reject do |replay|
      replay_id = replay['id']
      playlist = replay['playlist_id']
      fetched_replay_ids.include?(replay_id) || !allowed_playlists.include?(playlist)
    end
  end

  def update_fetched_replay_ids(new_replays, fetched_replay_ids)
    new_replays.each do |replay|
      fetched_replay_ids.add(replay['id'])
      Rails.logger.debug("Added replay: #{replay['id']} with date: #{replay['created']}")
    end
  end

  def save_replays_and_fetch_stats(replays, fetched_match_guids)
    replays.each do |replay|
      next if replay.nil?

      replay_id = replay['id']
      replay_stats = fetch_replay_stats(replay_id)
      next if replay_stats.nil?

      match_guid = replay_stats['match_guid']
      next if fetched_match_guids.include?(match_guid)

      fetched_match_guids.add(match_guid)
      Rails.logger.debug("Added match GUID: #{match_guid}")

      saved_replay = @player.replays.create(data: replay, replay_id:)
      save_replay_stats(saved_replay, replay_stats)
    end
  end

  def save_replay_stats(replay, stats)
    replay.replay_stats.create(stats:)
  end
end
