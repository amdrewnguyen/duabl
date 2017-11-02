json.id team.id
json.name team.name
json.ownerId team.owner_id
json.memberIds team.members.map(&:id)
json.projectIds team.projects.map(&:id)
