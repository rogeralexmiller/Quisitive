# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
names = ["Anna Lee", "Bart Simpson", "Marky Mark", "Susie Q"]

emails = ["anna@test.com", "bart@test.com", "mark@test.com","susie@test.com"]

password = "password"

names.each_with_index do |name, idx|
  User.create!(full_name: name, email: emails[idx], password: password)
end
