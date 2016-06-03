# This file contains all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
User.destroy_all
Question.destroy_all

emails = ["anna@test.com", "bart@test.com", "john@test.com", "jane@test.com", "mark@test.com","susie@test.com"]
names = ["Anna Lee", "Bart Simpson", "John Doe", "Jane Doe",  "Marky Mark", "Susie Q"]

password = "password"

User.create!(full_name:"Guest", email:"guest@test.com", password:"password")

names.each_with_index do |name, idx|
  User.create!(full_name: name, email: emails[idx], password: password)
end

users = User.all

Question.create!({author_id: users[0].id, body: "Why is the earth round?"})
Question.create!({author_id: users[0].id, body: "Why is the sky blue?"})
Question.create!({author_id: users[0].id, body: "Why are stars white?"})
Question.create!({author_id: users[1].id, body: "Why do mirrors reflect?"})
Question.create!({author_id: users[1].id, body: "What is the meaning of life?"})
Question.create!({author_id: users[1].id, body: "Why is water clear?"})
Question.create!({author_id: users[2].id, body: "Why do dogs howl at the moon?"})
Question.create!({author_id: users[2].id, body: "Why is space a vacuum?"})
Question.create!({author_id: users[2].id, body: "Why can't we see in the dark?"})
Question.create!({author_id: users[3].id, body: "What is the hottest substance anyone has ever held?"})
Question.create!({author_id: users[3].id, body: "When will there be commercial flights to mars?"})
Question.create!({author_id: users[3].id, body: "Has anyone ever been eaten by a giant squid?"})
Question.create!({author_id: users[4].id, body: "Who would win in a fight between Cthulhu and a Cracken?"})
Question.create!({author_id: users[4].id, body: "Who would win in a fight between Chuck Norris and Bruce Lee?"})
Question.create!({author_id: users[5].id, body: "Who would win in a fight between Cerberus and Chuck Norris?"})
Question.create!({author_id: users[5].id, body: "Who would win in a fight between a sphinx and a griffin?"})
Question.create!({author_id: users[5].id, body: "What is the airspeed velocity of an unladen swallow?"})
