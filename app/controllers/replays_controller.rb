class ReplaysController < ApplicationController
  before_action :clear, only: [:index]

  def index
    FetchReplaysService.new.fetch_replays
    @replays = Replay.all
  end

  private

  def clear
    Replay.delete_all
  end
end
