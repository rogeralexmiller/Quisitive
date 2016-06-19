json.array! @questions do |question|
  json.id question.id
  json.body question.body
  json.updated_at question.updated_at
  json.author question.author.full_name
  json.commentCount question.comments.length
  json.topics question.topics
end
