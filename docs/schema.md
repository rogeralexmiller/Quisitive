# Schema Information

### All tables will have created_at and updated_at columns with timestamp data

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
author_id   | integer   | not null, foreign key (references users), indexed

## answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
body        | text      | not null
question_id | integer   | not null, foreign key (references questions), indexed

## comments
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users), indexed
commentable_id   | integer   | not null, foreign key, polymorphic (references answers/questions), indexed
body             | text      | not null

## topics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## topic_taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references questions), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
full_name       | string    | not null
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
