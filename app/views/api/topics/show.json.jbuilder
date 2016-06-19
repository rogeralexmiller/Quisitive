json.id @topic.id
json.author @topic.author.full_name
json.name @topic.name
json.updated_at @topic.updated_at
json.questionCount @topic.questions.length
json.questions do
  json.array! @topic.questions do |question|
    json.id question.id
    json.body question.body
    json.comments question.comments
    json.author question.author.full_name
    json.commentCount question.comments.length
  end
end
json.author_id @topic.author_id
