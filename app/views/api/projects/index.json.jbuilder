@projects.each do |project|
  json.set! project.id do
    json.extract! project, :id, :owner_id, :name, :description
    json.set! :taskIds, project.tasks.map(&:id)
  end
end
