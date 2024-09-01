class Replay < ApplicationRecord
  belongs_to :player
  has_many :replay_stats, dependent: :destroy
end
