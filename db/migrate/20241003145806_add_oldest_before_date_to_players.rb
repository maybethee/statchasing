class AddOldestBeforeDateToPlayers < ActiveRecord::Migration[7.1]
  def change
    add_column :players, :oldest_before_date, :datetime
  end
end
