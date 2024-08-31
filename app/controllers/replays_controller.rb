class ReplaysController < ApplicationController
  before_action :clear, only: [:index]

  def index
    FetchReplaysService.new.fetch_all_replays
    player_name = 'BijouBug'
    @replays = Replay.includes(:replay_stats).all.map do |replay|
      presenter = ReplayPresenter.new(replay)
      Rails.logger.debug("Processing replay with replay_id: #{presenter.replay_id}")
      {
        replay_id: presenter.replay_id,
        map: presenter.map,
        # winning_team: presenter.winning_team,
        player_won: presenter.player_won?(player_name),
        percent_supersonic_speed: presenter.percent_supersonic_speed(player_name),
        demos_inflicted: presenter.demos_inflicted(player_name)
      }
    end
    render json: @replays
  end

  def clear
    Replay.find_each do |replay|
      replay.replay_stats.delete_all
      replay.destroy
    end
  end
end
