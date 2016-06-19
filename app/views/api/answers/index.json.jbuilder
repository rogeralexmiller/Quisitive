json.array! @answers do |answer|
  json.id answer.id
  json.body answer.body
  json.author answer.author.full_name
  json.updated_at answer.updated_at
  json.commentCount answer.comments.length
  json.comments answer.comments
  json.author_id answer.author_id
end
