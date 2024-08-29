class ReplaysController < ApplicationController
  before_action :clear, only: [:index]

  def index
    FetchReplaysService.new.fetch_replays
    @replays = Replay.includes(:replay_stats).all
  end

  private

  def clear
    Replay.find_each do |replay|
      replay.replay_stats.delete_all
      replay.destroy
    end
  end
end
