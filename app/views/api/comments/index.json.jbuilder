@comments.each do |comment|
  json.set! comment.id do

    json.id comment.id
    json.body comment.body
    json.updated_at comment.updated_at
    json.author comment.author.full_name

  end
end
