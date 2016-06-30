json.id @comment.id
json.body @comment.body
json.author @comment.author.full_name
json.author_id @comment.author_id
json.created_at time_ago_in_words(@comment.created_at)
json.commentable_id @comment.commentable_id
json.commentable_type @comment.commentable_type
