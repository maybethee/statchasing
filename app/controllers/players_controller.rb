class PlayersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:fetch_replays]

  def fetch_replays
    @player = Player.find_or_create_by(player_id: params[:player_id])
    replays = @player.replays.includes(:replay_stats)

    Rails.logger.debug("Player: #{@player.inspect}")
    Rails.logger.debug("Replays before fetch: #{replays.inspect}")

    if replays.empty?
      Rails.logger.debug("Fetching new replays for player: #{params[:player_id]}")
      FetchReplaysService.new(player_id: params[:player_id]).fetch_all_replays
      replays = @player.reload.replays.includes(:replay_stats)
    end

    Rails.logger.debug("Replays after fetch: #{replays.inspect}")

    render json: replays.to_json(include: :replay_stats)
  end
end
