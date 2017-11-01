# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

team_names = %w(Design Managers Sales)

only_user = User.create(email: 'a@a.com', password: 'aaaaaa', name: "Drew Nguyen")
only_other_user = User.create(email: 'demo', password: 'demooo', name: "Demodave")

users = []

5.times do
  new_name = Faker::Name.unique.first_name + " " + Faker::Name.unique.last_name
  users.push(User.create(email: Faker::Internet.email, 
                         password: 'aaaaaa',
                         name: new_name))
end

teams = []

team_names.each do |team_name|
  team = Team.create(owner_id: only_user.id, name: team_name)
  only_user.teams.append(team)
  only_other_user.teams.append(team)
  teams << team
end

project_names = ["full stack", "test project", "build a spaceship",
  "make my bed", "take over the world", "get groceries"]

projects = []

project_names.each do |name|
  projects.push(Project.create(name: name, owner_id: only_user.id, team_id: teams.sample.id))
end



tasks = []
puts projects.length
projects.each do |proj|
  (3 + rand(5)).times do
    task = Task.new(name: Faker::Dune.unique.quote, owner_id: proj.owner_id, project_id: proj.id)
    puts task
    if task.save
      puts "task saved"
    else
      puts task.errors.full_messages
    end
    tasks.push(task)
  end
end

puts "seed run successfully"
