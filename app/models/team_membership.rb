# == Schema Information
#
# Table name: team_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  team_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TeamMembership < ApplicationRecord
  belongs_to :user
  belongs_to :team

  validates :user_id, :team_id, presence: true
  validates :team_id, uniqueness: { scope: :user_id }
end
