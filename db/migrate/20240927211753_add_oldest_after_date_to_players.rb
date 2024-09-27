class AddOldestAfterDateToPlayers < ActiveRecord::Migration[7.1]
  def change
    add_column :players, :oldest_after_date, :datetime
  end
end
