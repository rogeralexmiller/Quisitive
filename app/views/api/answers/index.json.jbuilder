@answers.each do |answer|
  json.set! answer.id do

    json.id answer.id
    json.body answer.body
    json.author answer.author.full_name
    json.updated_at answer.updated_at

  end
end
