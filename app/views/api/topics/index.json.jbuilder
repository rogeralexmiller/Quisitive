json.array! @topics do |topic|
  json.id topic.id
  json.name topic.name
  json.updated_at topic.updated_at
  json.author topic.author.full_name
  json.questionCount topic.questions.length
  json.questions do
    json.array! topic.questions do |question|
      json.id question.id
      json.body question.body
      json.created_at time_ago_in_words(question.created_at)
      json.comments question.comments
      json.author question.author.full_name
      json.commentCount question.comments.length
    end
  end
end
