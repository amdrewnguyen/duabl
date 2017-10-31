# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  name         :string
#  assignee_id  :integer
#  completed    :boolean          default(FALSE)
#  completed_at :datetime
#  due_on       :date
#  due_at       :datetime
#  parent_id    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  owner_id     :integer          not null
#  project_id   :integer          not null
#

class Task < ApplicationRecord
  validates :project_id, :owner_id, presence: true

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id

  belongs_to :project

  has_many :subtasks,
    class_name: "Task",
    foreign_key: :parent_id,
    dependent: :destroy

  belongs_to :parent_task,
    class_name: "Task",
    foreign_key: :parent_id,
    optional: true
end
