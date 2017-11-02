# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Team < ApplicationRecord
  has_many :memberships,
    class_name: "TeamMembership",
    foreign_key: :team_id,
    dependent: :destroy

  has_many :members,
    through: :memberships,
    source: :user

  has_many :projects

  has_many :tasks,
    through: :projects,
    source: :tasks
end
