json.id team.id
json.ownerId team.owner_id
json.projectId team.project_id
json.name team.name
json.memberIds team.members.map(&:id)
json.projectIds team.projects.map(&:id)
