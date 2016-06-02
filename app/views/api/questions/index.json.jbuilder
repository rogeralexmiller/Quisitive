@questions.each do |question|
  json.set! question.id do
    json.extract! question, :id, :body

    json.author question.author.full_name

  end
end
