# This file contains all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

emails = ["anna@test.com", "bart@test.com", "mark@test.com","susie@test.com"]

password = "password"

names.each_with_index do |name, idx|
  User.create!(full_name: name, email: emails[idx], password: password)
end

Question.create!({author_id: 1, body: "Why is the earth round?"})
Question.create!({author_id: 1, body: "Why is the sky blue?"})
Question.create!({author_id: 1, body: "Why are stars white?"})
Question.create!({author_id: 2, body: "Why do mirrors reflect?"})
Question.create!({author_id: 2, body: "What is the meaning of life?"})
Question.create!({author_id: 2, body: "Why is water clear?"})
Question.create!({author_id: 3, body: "Why do dogs howl at the moon?"})
Question.create!({author_id: 3, body: "Why is space a vacuum?"})
Question.create!({author_id: 3, body: "Why can't we see in the dark?"})
Question.create!({author_id: 4, body: "What is the hottest substance anyone has ever held?"})
Question.create!({author_id: 4, body: "When will there be commercial flights to mars?"})
Question.create!({author_id: 4, body: "Has anyone ever been eaten by a giant squid?"})
Question.create!({author_id: 5, body: "Who would win in a fight between Cthulhu and a Cracken?"})
