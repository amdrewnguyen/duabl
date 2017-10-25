class AlterTasksIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :tasks, :owner_id
  end
end
