class AlterTasksAddColProjectId < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :project_id, :integer, null: false
    add_index :tasks, :project_id
  end
end
