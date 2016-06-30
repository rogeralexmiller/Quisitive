json.id @question.id
json.author @question.author.full_name
json.body @question.body
json.created_at time_ago_in_words(@question.created_at)
json.commentCount @question.comments.length
json.comments @question.comments
json.author_id @question.author_id
json.topics @question.topics
