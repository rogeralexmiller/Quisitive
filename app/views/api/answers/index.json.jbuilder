@answers.each do |answer|
  json.set! answer.id do
    json.extract! answer, :id, :body

    json.author answer.author

  end
end
