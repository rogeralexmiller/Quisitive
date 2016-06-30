json.id @topic.id
json.author @topic.author.full_name
json.name @topic.name
json.updated_at @topic.updated_at
json.questionCount @topic.questions.length
json.followers do
  json.array! @topic.followers do |follower|
    json.id follower.id
    json.full_name follower.full_name
  end
end
json.questions do
  json.array! @topic.questions do |question|
    json.id question.id
    json.body question.body
    json.created_at time_ago_in_words(question.created_at)
    json.comments question.comments
    json.author question.author.full_name
    json.commentCount question.comments.length
  end
end
json.author_id @topic.author_id
