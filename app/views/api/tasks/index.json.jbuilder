@tasks.each do |task|
  json.set! task.id do
    json.extract! task, :id, :name, :completed, :description
    json.parentId task.parent_id
    json.assigneeId task.assignee_id
    json.ownerId task.owner_id
    json.projectId task.project_id
    json.dueOn task.due_on
    json.set! :subtaskIds, task.subtasks.map(&:id)
  end
end
