# This file contains all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
User.destroy_all
Question.destroy_all
Answer.destroy_all
Comment.destroy_all

emails = ["anna@test.com",
          "bart@test.com",
          "john@test.com",
          "jane@test.com",
          "mark@test.com",
          "susie@test.com",
          "thor@test.com",
          "guest@test.com"
        ]
names = ["Anna Lee",
        "Bart Simpson",
        "John Doe",
        "Jane Doe",
        "Marky Mark",
        "Susie Q",
        "Thor Bad",
        "Guest"
        ]

password = "password"

names.each_with_index do |name, idx|
  User.create!(full_name: name, email: emails[idx], password: password)
end

users = User.all



Question.create!({author_id: users[0].id, body: "Why is the earth round?"})
Question.create!({author_id: users[0].id, body: "Why is the sky blue?"})
Question.create!({author_id: users[0].id, body: "Why do stars twinkle?"})
Question.create!({author_id: users[1].id, body: "Why do mirrors reflect light?"})
Question.create!({author_id: users[1].id, body: "What is the meaning of life?"})
Question.create!({author_id: users[1].id, body: "Why is water clear?"})
Question.create!({author_id: users[2].id, body: "Why do dogs howl at the moon?"})
Question.create!({author_id: users[2].id, body: "Why can't I learn to speak dolphin?"})
Question.create!({author_id: users[2].id, body: "Why can't we see in the dark?"})
Question.create!({author_id: users[3].id, body: "What is the hottest substance anyone has ever held without dying?"})
Question.create!({author_id: users[3].id, body: "When will there be commercial flights to mars?"})
Question.create!({author_id: users[3].id, body: "When will the mothership come for us?"})
Question.create!({author_id: users[5].id, body: "When was the greatest time to be alive?"})
Question.create!({author_id: users[3].id, body: "Has anyone ever been eaten by a giant squid?"})
Question.create!({author_id: users[3].id, body: "Has anyone ever ridden a tiger into battle like He-Man?"})
Question.create!({author_id: users[3].id, body: "Has anyone ever tamed a leopard?"})
Question.create!({author_id: users[4].id, body: "Who would win in a fight between Cthulhu and a Cracken?"})
Question.create!({author_id: users[4].id, body: "Who would win in a fight between Kahl Drogo and Jamie Lannister in his prime?"})
Question.create!({author_id: users[5].id, body: "Who would win in a fight between Cerberus and Medusa?"})
Question.create!({author_id: users[0].id, body: "Who is 'The Man'?"})
Question.create!({author_id: users[0].id, body: "Who would you want with you during an apocolypse"})
Question.create!({author_id: users[5].id, body: "Who would win in a fight between a sphinx and a griffin?"})
Question.create!({author_id: users[5].id, body: "What is the airspeed velocity of an unladen swallow?"})
Question.create!({author_id: users[6].id, body: "What is the cutest animal?"})
Question.create!({author_id: users[3].id, body: "Where should I live if I want to minimize my risk of being eaten by a Giant squid?"})
Question.create!({author_id: users[3].id, body: "Where should I go to escape the demon that I summoned from another world?"})
Question.create!({author_id: users[3].id, body: "Where can I find peace?"})
Question.create!({author_id: users[1].id, body: "What is the purpose of dogs?"})
Question.create!({author_id: users[6].id, body: "What is the purpose of cats?"})
Question.create!({author_id: users[6].id, body: "How many App Academy students does it take to screw in a light bulb"})
Question.create!({author_id: users[2].id, body: "How many balloons would I need to float to the moon?"})
Question.create!({author_id: users[3].id, body: "How many animals are there that can eat a person in one bite?"})
Question.create!({author_id: users[4].id, body: "How many ways are there to cook an egg?"})
Question.create!({author_id: users[5].id, body: "How do I become a super villain?"})
Question.create!({author_id: users[6].id, body: "How can become a rainbow?"})
Question.create!({author_id: users[4].id, body: "How do tidal waves work?"})
Question.create!({author_id: users[3].id, body: "How can I get better at math?"})
Question.create!({author_id: users[3].id, body: "If robots take over the world, what will that mean?"})
Question.create!({author_id: users[2].id, body: "What's the biggest risk you've ever taken?"})
Question.create!({author_id: users[3].id, body: "What's the square root of a rainy day?"})
Question.create!({author_id: users[3].id, body: "How many soccer balls can you fit in an airplane"})
Question.create!({author_id: users[3].id, body: "Are we destined for greatness?"})


questions = Question.all

authors = User.all

starts = ["It all goes back to ",
          "Obviously, the answer is ",
          "Let me answer this by telling a story. ",
          "I know the answer because I got a PhD on the subject. Let me break it down. ",
          "To understand the answer you need to understand ",
          "The answer is always ",
          "I googled it for you and the answer is ",
          "This is a silly question with a serious answer. It's ",
          "No. The answer is ",
          "Yes. The answer is "
          ]

hows = ["internal combustion.", "positive thinking.", "math.", "regular expressions.", "There's no way."]

nouns = ["snakes.",
        "cows.",
        "dragons.",
        "bears.",
        "dogs.",
        "iguanas.",
        "happiness.",
        "world domination.",
        "cats.",
        "death star.",
        "Literary fame.",
        "Unlimited power.",
        "Surprise parties.",
        "Nothing."
        ]

numbers = ["Zero.", "3.1415.", "24.", "128361.", "thousands.","2.", "38.", "145.", "-34."]
places = ["Greece.", "Oregon.", "Russia.", "Mexico.", "Australia.", "England.", "Nowhere."]
dates = ["1920.", "1513.", "6000 BC.", "2016.", "1995.", "1989.", "Never."]
people = ["Abraham Lincoln.",
          "George Washington.",
          "Julius Caesar.",
          "Hamlet.",
          "Amelia Earhart.",
          "Theodore Roosevelt.",
          "Nobody."
          ]

winner = "No one. When those two fight, the world will end."

random = people + dates + places + numbers + nouns + hows
lorem = " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

authors.each do |author|
  questions.each do |question|
    body = question.body
    if body.starts_with?("Why")
      text = starts.sample + nouns.sample + lorem
    elsif body.starts_with?("How many")
      text = starts.sample + numbers.sample + lorem
    elsif body.starts_with?("How")
      text = starts.sample + nouns.sample + " and " + hows.sample + lorem
    elsif body.starts_with?("What")
      text = starts.sample + nouns.sample + lorem
    elsif body.starts_with?("Who would win")
      text = winner + lorem
    elsif body.starts_with?("Who")
      text = starts.sample + people.sample + lorem
    elsif body.starts_with?("When")
      text = starts.sample + dates.sample
    elsif body.starts_with?("Where")
      text = places.sample + lorem
    else
      text = starts.sample + random.sample + lorem
    end
    Answer.create!(author_id: author.id, question_id: question.id, body: text)
  end
end

question_comments = ["Great question! You are clearly curious like a cat.
                      Don't get too curious, though. Down that road, madness lies...",
                      "Interesting question. I wish I knew the answer, but I don't!
                      I look forward to seeing the answers!",
                      "Dumb question! The answer is so obvious I'm not even going to
                      answer it, because I'm an awful person.",
                      "Fascinating!",
                      "What kind of twisted mind thinks up such questions!!!???
                      You must have had a weird childhood!",
                      "I look forward to observing the intellectual products of
                      this incisive question.",
                      "If anyone disagrees with my cursory judgement of this question,
                      I will lash out with vitriol because that's how I make it
                      through the day.",
                      "LOUD NOISES!!! LOUD NOISES!!!",
                      "Dude, you should have googled this question first....",
                      "Iiiinterrrrressssting!",
                      "HMMMMMMMMMMMM",
                      "Good show, chap. You should be a philosopher!"
                    ]

answer_comments = ["Great answer! You should write a book about this!",
                    "This is LITERALLY the best answer I've ever read anywhere",
                    "Your intellectual prowess is evident by your firm grasp on latin",
                    "I can tell you have a big brain because you used big words
                     I don't understand.",
                     "I bow down to you, master!",
                     "This answer is pure bologna!",
                     "My fifth grade son could answer this question better than you!",
                     "If anyone disagrees with my cursory judgement of this answer,
                     I will lash out with vitriol because that's how I make it
                     through the day.",
                     "LOUD NOISES!!! LOUD NOISES!!!",
                     "A well researched, thorough answer. Bravo!",
                     "Not to be contrary, but I disagree with you because I like
                     to seem different",
                     "Check your facts, fool. You wrong!",
                     "Your lack of punctuation and proper grammatical constructs
                     betrays your feeble mind.",
                  ]

answers = Answer.all

authors.each do |author|
  questions.each do |question|
    Comment.create!(
                    author_id: author.id,
                    commentable_id: question.id,
                    commentable_type: "Question",
                    body: question_comments.sample
    )
  end
  answers.each do |answer|
    Comment.create!(
                    author_id: author.id,
                    commentable_id: answer.id,
                    commentable_type: "Answer",
                    body: answer_comments.sample
    )
  end
end
