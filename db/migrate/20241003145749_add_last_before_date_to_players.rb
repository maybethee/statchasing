class AddLastBeforeDateToPlayers < ActiveRecord::Migration[7.1]
  def change
    add_column :players, :last_before_date, :datetime
  end
end
