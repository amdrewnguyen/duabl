@tasks.each do |task|
  json.set! task.id do
    json.extract! task, :id, :name, :assignee_id, :completed, :due_on,
      :parent_id, :owner_id, :project_id
    json.set! :subtaskIds, task.subtasks.map(&:id)
  end
end
