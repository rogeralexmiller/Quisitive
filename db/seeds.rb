# This file contains all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
User.destroy_all
Question.destroy_all
Answer.destroy_all
Comment.destroy_all
Topic.destroy_all
TopicTagging.destroy_all

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
          "Yes. The answer is ",
          "Let me answer your question ",
          "Every question is like an onion. When we begin to peal back the layers we start to cry. I'm sorry to inform you, but the answer is ",
          "I'm going to answer your question but first I have to warn you: this information could make your head explode. It's all about ",
          "Great question! I've been waiting for someone to ask this question since I was a wee lad. The answer is ",
          "Normally I wouldn't answer a question like this, but you caught me on a good day. The answer is ",
          "After searching the internet for 5 minutes, I've found the answer. It's ",
          "Mark my words. The answer is "
          ]

hows = [
  "internal combustion",
  "positive thinking",
  "math",
  "regular expressions",
  "quantum mechanics",
  "time travel",
  "mustaches",
  "beards",
  "Kenny G",
  "surviving the emergence of mole people",
  "summoning the cracken",
  "self realization",
  "great beer"
]

nouns = ["snakes.",
        "cows.",
        "dragons.",
        "llamas.",
        "pandas.",
        "dolphins.",
        "sharks.",
        "crocodiles.",
        "mole people.",
        "giant squid.",
        "bears.",
        "dogs.",
        "iguanas.",
        "happiness.",
        "world domination.",
        "a great sandwich.",
        "bespoke flooring",
        "teenage angst",
        "puppies",
        "kittens",
        "dogs",
        "strong moral fiber.",
        "high fives.",
        "synergy.",
        "vertical integration.",
        "dynamic typing.",
        "science.",
        "cats.",
        "death star.",
        "literary fame.",
        "unlimited power.",
        "surprise parties.",
        "nothing."
        ]

numbers = [
  "Zero.",
  "3.1415.",
  "24.",
  "128361.",
  "thousands.",
  "2.",
  "38.",
  "145.",
  "-34.",
  "1.",
  "200.",
  "300.",
  "1 million.",
  "infinity",
  "-1",
  "21"
]
places = [
  "Greece.",
  "Oregon.",
  "Russia.",
  "Mexico.",
  "Australia.",
  "England.",
  "Nowhere.",
  "Anywhere.",
  "Ireland.",
  "Kenya.",
  "Iceland.",
  "Peru.",
  "Brazil.",
  "Chile.",
  "Washington.",
  "New York.",
  "Norway.",
  "Australia."
]

dates = [
  "1920.",
  "1513.",
  "6000 BC.",
  "2016.",
  "1995.",
  "1989.",
  "Never.",
  "In the distant past.",
  "In the distant future.",
  "3000.",
  "1000 BC.",
  "1400.",
  "Last week.",
  "Seven years ago.",
  "Oh, around 1955."

]
people = ["Abraham Lincoln.",
          "George Washington.",
          "Julius Caesar.",
          "Hamlet.",
          "Amelia Earhart.",
          "Theodore Roosevelt.",
          "Nobody.",
          "Marc Antony.",
          "Cleopatra.",
          "Julie Andrews.",
          "Marie Curie.",
          "Virginia Woolf.",
          "Earnest Hemingway.",
          "that guy in IT.",
          "The mayor of New York.",
          "Old man Steve.",
          "An old wise woman named Cecilia.",
          "Kenny G.",
          "Bob the builder.",
          "Dora the explorer.",
          "The Prince of Darkness, my his name live in infamy forever.",
          "A spritely young fellow named George.",
          ]

winner = "No one. When those two fight, the world will end."

random = people + dates + places + numbers + nouns + hows
fillers = [
  "Where to begin? I first learned about the subject when I was but a boy of 10,
   working on a small farm in"+places.sample,
  "Let me start at the beginning. I was born in Oregon in "+ dates.sample + "All was going
   well till I took a wrong turn off Main Street and begain pondering the meaning of the number "+numbers.sample,
  "I got my first taste of adventure at the age of 19 while wrangling "+nouns.sample+" in wilds of "+places.sample,
  "In times of plenty we take for granted the benefits of "+nouns.sample,
  "I owe my vast knowledge of this subject to " + people.sample + "In the prime
  of my youth they taught me "+ hows.sample + " Eventually, however, I knew I had
   to break free of my sage mentor and venture out on my own.",
  "I had to completely abandon everything else I knew to become the foremost expert on "+ (hows+nouns).sample
]

enders = [
  "And that's all there is to it. If you want to learn more, buy my book.",
  "And that's why you should always leave a note.",
  "And that's why I always bring a first aid kit.",
  "And that concludes the answer to your ridiculous question.",
  "My cat is meowing, so I'm just gonna stop here. I shall return once Jingles is fed.",
  "And so it goes that we are all doomed to a life of constant torment by "+nouns.sample,
  "The end. Answering this question has spent my mental reserves so I'm going to need a nap.",
  "End. I hope you are satisfied with that question. If not, then go ask my friend, "+ people.sample,
  "And that's why you should never pick a fight with "+people.sample,
  "This concludes side 1 of, 'answering your dumb question'.Please switch to side 2 to hear the rest.",
  "I'm afraid that answering this question has opened a portal to another
  dimension and you all have 10 minutes to live. My sincerest apologies.",
  "The end. Many thanks to " + people.sample + "Their advice and support was invaluable to answering this question.",
  "I can't think of a better way to end this answer, so I'm just going to trail off.................",
  "And boom. There you have it. The answer of the century. The answer to end all answers.",
  "The end. I hope this answer was as fun to read as it was to write.",
  "And then we rocked like we never rocked before. And that my, friend, was how the revolution began.",
]
authors.each do |author|
  questions.each do |question|
    body = question.body
    if body.starts_with?("Why")
      text = starts.sample + nouns.sample + fillers.sample + " "+enders.sample
    elsif body.starts_with?("How many")
      text = starts.sample + numbers.sample + fillers.sample + " "+enders.sample
    elsif body.starts_with?("How")
      text = starts.sample + nouns.sample + " and " + hows.sample + fillers.sample + " "+enders.sample
    elsif body.starts_with?("What")
      text = starts.sample + nouns.sample + fillers.sample + " "+enders.sample
    elsif body.starts_with?("Who would win")
      text = winner + fillers.sample + " "+enders.sample
    elsif body.starts_with?("Who")
      text = starts.sample + people.sample + fillers.sample + " "+enders.sample
    elsif body.starts_with?("When")
      text = starts.sample + dates.sample
    elsif body.starts_with?("Where")
      text = places.sample + fillers.sample + " "+enders.sample
    else
      text = starts.sample + random.sample + fillers.sample + " "+enders.sample
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

subjects = ["Biology", "Astronomy", "History", "Politics", "Religion", "Philosophy",
        "Art", "Animals", "Humor", "Programming", "Food", "Lifestyle", "Sports"]

users.each do |user|
  Topic.create(name:subjects.pop, author_id: user.id)
end

subjects.each{|subject| Topic.create(name:subject, author_id: users.sample.id)}

topics = Topic.all

questions.each do |question|
  TopicTagging.create(question_id: question.id, topic_id: topics.sample.id)
  TopicTagging.create(question_id: question.id, topic_id: topics.sample.id)
  TopicTagging.create(question_id: question.id, topic_id: topics.sample.id)
  TopicTagging.create(question_id: question.id, topic_id: topics.sample.id)
end
