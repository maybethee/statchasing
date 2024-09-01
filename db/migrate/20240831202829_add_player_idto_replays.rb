class AddPlayerIdtoReplays < ActiveRecord::Migration[7.1]
  def change
    add_column :replays, :player_id, :string
  end
end
