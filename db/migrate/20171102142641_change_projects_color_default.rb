class ChangeProjectsColorDefault < ActiveRecord::Migration[5.1]
  def change
    change_column_default :projects, :color, "transparent"
  end
end
