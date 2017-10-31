json.set! :teams do
  @teams.each do |team|
    json.set! team.id do
      json.extract! team, :id, :name
      member_ids = team.members.map(&:id)
      member_ids.delete(current_user.id)
      json.set! :memberIds, member_ids
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
