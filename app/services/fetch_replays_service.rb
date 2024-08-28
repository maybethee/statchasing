# app/services/fetch_replays_service.rb
class FetchReplaysService
  include HTTParty
  base_uri ENV['API_BASE_URL']

  def initialize
    @options = {
      headers: { 'Authorization' => "#{ENV['API_AUTH_TOKEN']}" }
    }
  end

  def fetch_replays
    response = self.class.get('/replays/a10a0b4b-7ac6-44f7-a25c-79dc300fe718', @options)
    Rails.logger.debug("Response: #{response.body}")
    if response.success?
      save_replays(response.parsed_response)
    else
      Rails.logger.error("Failed to fetch data: #{response.message}")
    end
  end

  private

  def save_replays(replays)
    replays.each do |replay|
      Replay.create(data: replay)
    end
  end
end
