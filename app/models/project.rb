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
#  color       :string
#

class Project < ApplicationRecord
  validates :name, :owner_id, presence: true

  validates :color, inclusion: { in: %w(transparent #E53B53 #FB6238 #FB9927 #EDC12C #EDC12C #67D073 #40C4AB #2DABE7 #4588DD #7A73ED #A967E0 #E167E1 #E8529C #FA92AD #8DA3A5 ),
    message: "%{value} is not a valid color" }

  belongs_to :owner,
             class_name: "User",
             foreign_key: :owner_id

  has_many :tasks

  belongs_to :team
end
