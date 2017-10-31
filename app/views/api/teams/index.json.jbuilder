json.set! :teams do
  @teams.each do |team|
    json.set! team.id do
      json.extract! team, :id, :name
      member_ids = team.members.map(&:id)
      member_ids.delete(current_user.id)
      json.set! :memberIds, member_ids
      project_ids = team.projects.map(&:id)
      json.set! :projectIds, project_ids
    end
  end
end

json.set! :users do
  members = []
  @teams.each do |team|
    members += team.members
  end
  members.uniq.delete(current_user)
  members.each do |member|
    json.set! member.id do
      json.partial! '/api/users/user', user: member
    end
  end
end

json.set! :projects do
  projects = []
  @teams.each do |team|
    projects += team.projects
  end
  projects.uniq
  projects.each do |project|
    json.set! project.id do
      json.partial! '/api/projects/project', project: project
    end
  end
end
