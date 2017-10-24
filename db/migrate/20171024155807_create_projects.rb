class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false
      t.text :description
      t.integer :team_id

      t.timestamps
    end
    add_index :projects, :owner_id
  end
end
