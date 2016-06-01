# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET api/users/new`
- `POST api/users`
- `PATCH api/users`

### Session

- `GET api/session/new`
- `POST api/session`
- `DELETE api/session`

## JSON API

### Questions

- `GET /api/questions`
  - questions index/search
  - accepts `tag_name` query param to list questions by tag
  - accepts pagination params (if I get there)
- `POST /api/questions`
- `GET /api/questions/:id`
- `PATCH /api/questions/:id`
- `DELETE /api/questions/:id`

### Answers

- `GET /api/questions/:questionId/answers`
  - index of all answers for a question
- `POST /api/questions/:questionId/answers`
  - Create answer for a question
- `GET /api/answers/:id`
  - Get a single answer
- `PATCH /api/answers/:id`
  - Update a single answer
- `DELETE /api/answers/:id`
  - Delete a single answer

### Comments

- `GET /api/answers/:answerId/comments`
  - index of all comments for an answer
- `GET /api/questions/:questionId/comments`
  - index of all comments for an question
- `POST /api/answers/:answerId/comments`
  - Create comment for an answer
- `POST /api/questions/:questionId/comments`
  - Create comment for an question
- `GET /api/comments/:id`
  - Get a single comment
- `PATCH /api/comments/:id`
  - Update a single comment
- `DELETE /api/comments/:id`
  - Delete a single comment

### Topics

- A question's topics will be included in the question show template
- `GET /api/topics`
  - Get all topics
- `POST /api/questions/:question_id/topics`
  - Add topic to question. Can also substitute
- `DELETE /api/questions/:question_id/topics/:topic_name`: remove topic from question by name
