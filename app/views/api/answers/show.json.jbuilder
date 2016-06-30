json.id @answer.id
json.author @answer.author.full_name
json.body @answer.body
json.created_at time_ago_in_words(@answer.created_at)
json.commentCount @answer.comments.length
json.comments @answer.comments
json.author_id @answer.author_id
