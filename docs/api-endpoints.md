# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

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
- `POST /api/answers/:answerId/comments`
  - Create comment for an answer
- `GET /api/comments/:id`
  - Get a single comment
- `PATCH /api/comments/:id`
  - Update a single comment
- `DELETE /api/comments/:id`
  - Delete a single comment

### Tags

- A question's tags will be included in the note show template
- `GET /api/tags`
  - Get all tags
- `POST /api/questions/:question_id/tags`
  - Add tag to question
- `DELETE /api/questions/:question_id/tags/:tag_name`: remove tag from note by
  name
