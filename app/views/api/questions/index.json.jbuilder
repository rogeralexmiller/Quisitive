@questions.each do |question|
  json.set! question.id do
    json.id question.id
    json.body question.body
    json.updated_at question.updated_at
    json.author question.author.full_name
  end
end
