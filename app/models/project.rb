# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  owner_id    :integer          not null
#  name        :string           not null
#  description :text
#  team_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project < ApplicationRecord
  validates :name, :owner_id, presence: true

  belongs_to :owner,
             class_name: "User",
             foreign_key: :owner_id

  has_many :tasks

  belongs_to :team
end
