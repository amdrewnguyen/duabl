# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'


colors = %w(#E53B53 #FB6238 #FB9927 #EDC12C #EDC12C #67D073 #40C4AB #2DABE7 #4588DD #7A73ED #A967E0 #E167E1 #E8529C #FA92AD #8DA3A5 )

pw = 'spiderman'

data = User.create(email: 'data@goonies.org', password: pw, name: "Data Wang")
data.update(image: File.open('app/assets/images/data.jpg'))

chunk = User.create(email: 'chunk@goonies.org', password: pw, name: "Chunk Cohen")
chunk.update(image: File.open('app/assets/images/chunk.jpg'))

mouth = User.create(email: 'mouth@goonies.org', password: pw, name: "Mouth Devereaux")
mouth.update(image: File.open('app/assets/images/mouth.jpg'))

mikey = User.create(email: 'mikey@goonies.org', password: pw, name: "Mikey Walsh")
mikey.update(image: File.open('app/assets/images/mikey.jpg'))

sloth = User.create(email: 'sloth@goonies.org', password: pw, name: "Sloth Fratelli")
sloth.update(image: File.open('app/assets/images/sloth.jpg'))

goonies_members = [data, chunk, mouth, mikey, sloth]

goonies = Team.create(name: "Goonies", owner_id: mikey.id)

puts goonies.id
puts goonies.name
puts goonies.owner_id

goonies.members = goonies_members

goonies_project_names = ["Investigate Fratellis", "Find Gold", "Avoid Danger"]

goonies_task_names = [["navigate to restaurant", "distract criminals", "scream"],
                   ["get treasure map", "find One-Eyed Willy", "go to cave"],
                   ["run", "scream", "talk", "set booty traps", "smash"]]

traps_subtask_names = ["slick shoes", "bully blinders", "pinchers of peril", "sticky dart"]

goonies_projects = []

goonies_project_names.each do |name|
  project = Project.create(name: name, owner_id: mikey.id, team_id: goonies.id, color: colors.sample)
  puts "Created project: " + project.name.to_s + " : " + project.id.to_s
  goonies_projects.push(project)
end

goonies_projects.each_with_index do |proj, i|
  goonies_task_names[i].each do |task_name|
    task = Task.create(name: task_name, owner_id: mikey.id, project_id: proj.id)
    if task.name == "set booty traps"
      traps_subtask_names.each do |subtask_name|
        subtask = Task.create(name: subtask_name, owner_id: data.id, assignee_id: data.id, parent_id: task.id, project_id: proj.id)
        puts subtask.id.to_s
      end
    end
    proj.tasks.append(task)
    puts task.name
  end
end



team_names = ["duabl.io", "facebook", "ACME"]
project_names = %w(Design Managers Sales Frontend Backend)
task_names = [
  ["create mockups", "design layout", "find inspiration"],
  ["set meetings", "go to meetings"],
  ["meet with customers", "cold calls", "go door to door"],
  ["learn CSS grid", "make components", "learn more JS"],
  ["create API", "design database", "solve N+1", "make bed", "get groceries"],
]

drew = User.create(email: 'drew@duabl.com', password: 'aaaaaa', name: "Drew Nguyen")
demo_dave = User.create(email: 'demo@duabl.com', password: 'demooo', name: "Demo Dave")

other_users = []

100.times do
  new_name = Faker::Name.unique.first_name + " " + Faker::Name.unique.last_name
  other_users.push(User.create(email: Faker::Internet.email,
                         password: pw,
                         name: new_name))
end

teams = []

team_names.each do |team_name|
  owner = [drew, demo_dave].sample
  team = Team.create(owner_id: owner.id, name: team_name)
  drew.teams.append(team)

  20.times do
    new_member = other_users.sample
    if !(team.members.include?(new_member))
      team.members.append(new_member)
    end
  end

  teams << team
end

projects = []

project_names.each do |name|
  projects.push(Project.create(name: name, owner_id: drew.id, team_id: teams.sample.id, color: colors.sample))
end

projects.each_with_index do |proj, i|
  task_names[i].each do |task_name|
    proj.tasks.append(Task.create(name: task_name, owner_id: proj.team.owner_id, project_id: proj.id))
  end
end

puts "seed run successfully"
