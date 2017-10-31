class AlterTaskAddDescription < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :description, :text
  end
end
