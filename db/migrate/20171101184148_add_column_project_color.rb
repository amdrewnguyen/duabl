class AddColumnProjectColor < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :color, :string
  end
end
