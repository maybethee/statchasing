# test_active_record.rb
require_relative 'config/environment'

begin
  # Simulate fetched replay data
  replay_data = {
    id: 'test_id',
    created: '2024-08-26T19:44:09.752068+00:00',
    date: '2024-08-26T21:44:10+02:00',
    link: 'https://ballchasing.com/api/replays/test_id',
    duration: 321_000,
    map_code: 'street_p',
    blue: {
      players: [
        { id: { id: '76561198285832951', platform: 'steam' }, score: 936, start_time: 0, end_time: 321.55603,
          name: 'Stade', mvp: true, pro: true, rank: nil },
        { id: { id: '76561198323199585', platform: 'steam' }, score: 697, start_time: 0, end_time: 321.55603,
          name: 'Haven 0', mvp: nil, pro: true, rank: { tier: 22, name: 'Supersonic Legend', id: 'supersonic-legend' } }
      ],
      name: nil,
      goals: 6
    },
    orange: {
      players: [
        { id: { id: '76561198077404118', platform: 'steam' }, score: 484, start_time: 0, end_time: 321.55603,
          name: 'hp', mvp: nil, pro: true, rank: { tier: 22, name: 'Supersonic Legend', id: 'supersonic-legend' } },
        { id: { id: '76561198006822909', platform: 'steam' }, score: 355, start_time: 0, end_time: 321.55603,
          name: 'matsgrey', mvp: nil, pro: true, rank: { tier: 22, name: 'Supersonic Legend', id: 'supersonic-legend' } }
      ],
      name: nil,
      goals: 2
    },
    replay_title: '2024-08-26.21.44 Haven  Ranked Doubles Win',
    rocket_league_id: 'A692F57F48262E4A238624954FE5564D',
    season: 15,
    uploader: { steam_id: 76_561_198_323_199_585, name: 'Haven ツ', profile_url: 'https://steamcommunity.com/id/HavenRL/',
                avatar: 'https://avatars.steamstatic.com/2c67670ae1e10c8e181532c3050fc575a126f817.jpg' },
    visibility: 'public',
    season_type: 'free2play',
    groups: nil,
    max_rank: { tier: 22, name: 'Supersonic Legend', division: nil, id: 'supersonic-legend' },
    min_rank: { tier: 22, name: 'Supersonic Legend', division: nil, id: 'supersonic-legend' },
    recorder: nil,
    map_name: 'Sovereign Heights (Dusk)',
    overtime: false,
    overtime_seconds: nil,
    playlist_id: 'ranked-doubles',
    playlist_name: 'Ranked Doubles',
    date_has_tz: true
  }

  # Convert to JSON
  replay_json = replay_data.to_json
  puts "Replay JSON: #{replay_json}"

  # Create Replay record
  replay = Replay.new(data: replay_json)
  if replay.save
    puts "Replay saved successfully: #{replay.id}"
  else
    puts "Error saving replay: #{replay.errors.full_messages}"
  end
rescue StandardError => e
  puts "Exception occurred: #{e.message}"
end
