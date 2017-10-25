class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :assignee_id
      t.boolean :completed
      t.datetime :completed_at
      t.date :due_on
      t.datetime :due_at
      t.integer :parent_id

      t.timestamps
    end
  end
end
