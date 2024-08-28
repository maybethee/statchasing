# test_ballchasing_api.rb
require 'ballchasing'
require 'json'

# token = K1W0AO9Y6S9FEETJ8LK3Ar6AwtUVUaIrrXlejkVd

api = Ballchasing::API.new(K1W0AO9Y6S9FEETJ8LK3Ar6AwtUVUaIrrXlejkVd)

begin
  results = api.replays(
    'replay-date-after': (DateTime.now - 1).rfc3339,
    'sort-by': 'replay-date',
    'sort-dir': 'asc',
    'count': 10,
    'playlist': 'ranked-doubles',
    'min-rank': 'grand-champion'
  )
  puts results.inspect

  results.each do |summary|
    puts JSON.pretty_generate(summary.replay)
  end
rescue StandardError => e
  puts "Exception occurred: #{e.message}"
end
