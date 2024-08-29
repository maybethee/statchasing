class AddReplayIdToReplays < ActiveRecord::Migration[7.1]
  def change
    add_column :replays, :replay_id, :string
  end
end
