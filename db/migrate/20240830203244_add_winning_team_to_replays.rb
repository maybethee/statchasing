class AddWinningTeamToReplays < ActiveRecord::Migration[7.1]
  def change
    add_column :replays, :winning_team, :string
  end
end
