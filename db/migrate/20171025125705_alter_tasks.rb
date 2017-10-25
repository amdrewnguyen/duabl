class AlterTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :owner_id, :integer, null: false
    change_column_default :tasks, :completed, false
    change_column_null :tasks, :name, false
  end
end
