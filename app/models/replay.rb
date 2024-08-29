class Replay < ApplicationRecord
  has_many :replay_stats, dependent: :destroy
end
