# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

only_user = User.new(email: 'a@a.com', password: 'aaaaaa')
only_other_user = User.new(email: 'demo', password: 'demooo')

only_user.save
only_other_user.save

project_names = ["full stack", "test project", "build a spaceship",
  "make my bed", "take over the world", "get groceries"]

projects = []

project_names.each do |name|
  projects.push(Project.create(name: name, owner_id: only_user.id))
  projects.push(Project.create(name: name, owner_id: only_other_user.id))
end

verbs = %w(scold charge unlock cough trace
           fasten guess claim joke license search challenge taste trick
           connect arrange avoid tap nest curve crush greet peep turn
           memorise change follow sc coil launch wave
           stain suit jump)

tasks = []

projects.each do |proj|
  (3 + rand(5)).times do
    tasks.push(Task.create(name: Faker::Dune.unique.quote, owner_id: proj.owner_id, project_id: proj.id))
  end
end

puts "seed run successfully"
