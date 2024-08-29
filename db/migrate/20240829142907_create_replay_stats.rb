class CreateReplayStats < ActiveRecord::Migration[7.1]
  def change
    create_table :replay_stats do |t|
      t.references :replay, null: false, foreign_key: true
      t.json :stats

      t.timestamps
    end
  end
end
