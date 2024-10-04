class Replay < ApplicationRecord
  belongs_to :player
  has_many :replay_stats, dependent: :destroy

  # date must be converted to rfc3999 (date.to_time.utc.iso8601)
  def self.destroy_replays_with_old_stats(date)
    joins(:replay_stats).where("replay_stats.stats->>'date' < ?", date).destroy_all
  end
end
