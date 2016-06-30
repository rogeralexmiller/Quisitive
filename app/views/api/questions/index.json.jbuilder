json.array! @questions do |question|
  json.id question.id
  json.body question.body
  json.created_at time_ago_in_words(question.created_at)
  json.author question.author.full_name
  json.commentCount question.comments.length
  json.comments question.comments
  json.topics question.topics
end
