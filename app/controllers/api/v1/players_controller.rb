class Api::V1::PlayersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[fetch_replays fetch_replays_admin]

  before_action :authenticate_user!, only: [:fetch_replays_admin]

  # def delete_after_n_days(days)
  #   @players = Player.all

  #   @player = Player.find_or_create_by(player_id: params[:player_id])
  #   replays = @player.replays.includes(:replay_stats)
  #   Player.where()
  # end

  def fetch_replays
    @player = Player.find_or_create_by(player_id: params[:player_id])

    replays = @player.replays.includes(:replay_stats)

    Rails.logger.debug("Player: #{@player.inspect}")
    Rails.logger.debug("Replays before fetch: #{replays.inspect}")

    if replays.empty? || outdated?(replays)
      Rails.logger.debug("Fetching new replays for player: #{params[:player_id]}")
      FetchReplaysService.new(player_id: params[:player_id]).fetch_all_replays
      replays = @player.reload.replays.includes(:replay_stats)
    end

    Rails.logger.debug("Replays after fetch: #{replays.inspect}")

    render json: replays.to_json(include: :replay_stats)
  end

  def fetch_replays_admin
    Rails.logger.debug "Request parameters: #{params.inspect}" # Add logging

    # Convert sync to a boolean
    sync_to_present = params[:sync] == true || params[:sync] == 'true'

    Rails.logger.debug "Sync to present: #{sync_to_present}" # Log the value

    Rails.logger.debug "Current user: #{current_user.inspect}"
    Rails.logger.debug "Is admin: #{current_user&.admin?}"

    if current_user.admin?
      @player = Player.find_or_create_by(player_id: params[:player_id])

      Rails.logger.debug("replays that DONT include replay stats?: #{@player.replays.includes(!:replay_stats)}")
      after_date = params[:after_date]
      sync_to_present = params[:sync]

      if sync_to_present
        newest_replay = @player.replays.max_by { |replay| replay['data']['date'] }
        # ensure if called on nonexisting player, there is always an after date to prevent fetching every replay
        after_date = newest_replay ? newest_replay['data']['date'] : Date.today.to_time.utc.iso8601
      elsif after_date.nil?
        render json: { error: 'after_date parameter is required for fetching old replays' }
        return
      end

      Rails.logger.debug("Fetching new replays for player: #{params[:player_id]} with after_date: #{params[:after_date]}")

      FetchReplaysService.new(player_id: params[:player_id], after_date:).fetch_all_replays(sync_to_present)

      replays = @player.reload.replays.includes(:replay_stats)

      Rails.logger.debug("Replays after fetch: #{replays.inspect}")

      render json: replays.to_json(include: :replay_stats)

    else
      render json: { error: 'Not authorized' }, status: :forbidden
    end
  end

  private

  # checks whether current player's replays are out of date
  def outdated?(player_replays)
    Rails.logger.debug("passed replays: #{player_replays.inspect}")
    newest_replay_date = player_replays.max_by { |replay| replay['data']['date'] }['data']['date']
    Rails.logger.debug("newest replay date: #{newest_replay_date.inspect}")
    Rails.logger.debug("today's date: #{Date.today}")

    true if newest_replay_date < Date.today.to_time.utc.iso8601
  end
end
