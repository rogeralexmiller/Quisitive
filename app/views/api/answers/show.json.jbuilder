json.id @answer.id
json.author @answer.author.full_name
json.body @answer.body
json.updated_at @answer.updated_at
json.commentCount @answer.comments.length
json.author_id @answer.author_id
