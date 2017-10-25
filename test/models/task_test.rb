# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  assignee_id  :integer
#  completed    :boolean          default(FALSE)
#  completed_at :datetime
#  due_on       :date
#  due_at       :datetime
#  parent_id    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  owner_id     :integer          not null
#

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
