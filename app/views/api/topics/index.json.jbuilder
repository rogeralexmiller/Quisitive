@topics.each do |topic|
  json.set! topic.id do
    json.id topic.id
    json.name topic.name
    json.updated_at topic.updated_at
    json.author topic.author.full_name
    json.questionCount topic.questions.length
  end
end
