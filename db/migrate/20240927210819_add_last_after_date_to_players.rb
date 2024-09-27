class AddLastAfterDateToPlayers < ActiveRecord::Migration[7.1]
  def change
    add_column :players, :last_after_date, :datetime
  end
end
