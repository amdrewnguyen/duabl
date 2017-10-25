@tasks.each do |task|
  json.set! task.id do
    json.extact! task, :id, :name, :assignee_id, :completed, :due_on,
      :parent_id, :owner_id, :project_id
  end
end
