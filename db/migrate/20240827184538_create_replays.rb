class CreateReplays < ActiveRecord::Migration[7.1]
  def change
    create_table :replays do |t|
      t.json :data

      t.timestamps
    end
  end
end
