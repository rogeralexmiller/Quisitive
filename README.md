# Quisitive

[Heroku link][heroku]

[heroku]: https://quisitive.herokuapp.com/

##  Minimum Viable Product

Quisitive is a web application inspired by Quora that will be built with Ruby on Rails and React.js. By the
end of week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login, and guest/demo login
- [x] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for a Quora-inspired site: question asking, editing, answering, commenting and searching,
and topic question feeds
- [x] Hosting on Heroku
- [x] CSS styling that is elegant and similar to the real Quora.
- [ ] A production README, replacing this README

## Product Goals and Priorities

Quisitive will allow users to do the following:

- [x] Create an account (MVP)
- [x] Log in / Log out, including as a Guest/Demo User (MVP)
- [X] Ask, read, answer, edit and delete questions(MVP)
- [x] Comment on answers and questions(MVP)
- [ ] See feeds of questions filtered by topic (MVP)
- [ ] Tag their own questions with topics (MVP)
- [ ] Search with dropdown of previously asked questions

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux_cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Question Model, API, and basic APIUtil (1.5 days)

**Objective:** Questions can be created, read, edited and destroyed through
the API.

- [x] create `Question` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for questions (`QuestionsController`)
- [x] jBuilder views for questions
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Questions can be created, read, edited and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each question component, building out the flux loop as needed.
  - [x] `QuestionsIndex`
  - [x] `QuestionIndexItem`
  - [x] `NewQuestionForm`
  - [x] `EditQuestionForm`
- [x] save Questions to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Answers (1 day)

**Objective:** Answers belong to Questions, and can be viewed by QuestionDetail. The top rated answer for each question will be shown in the questionIndex

- [x] create `Answer` model
- build out API, Flux loop, and components for:
  - [x] Answer CRUD
  - [x] adding answers requires a question
- Use CSS to style updated QuestionDetail page

### Phase 5: Comments (1 day)

**Objective:** Comments belong to Answers, and can be viewed in AnswerIndex on a dropdown

- [x] create `Comments` model
- build out API, Flux loop, and components for:
- [x] Comments CRUD
- [x] adding comments requires an answer or question
- Use CSS to style updated QuestionDetail page


### Phase 6: TopicTags (1.5 days)

**Objective:** Questions can be tagged with multiple topic tags

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for question
  - [ ] adding tags to question
  - [ ] creating tags while creating questions
  - [ ] Viewing all questions tagged as a topic.
- [ ] Style new elements for TopicDetail page (filtered question index)

### Phase 7: Give question form ability to run searches on previously asked questions (1.5 days)

**objective:** Enable question searches

- [ ] Create searchResult dropdown component that responds to question input
- [ ] Dropdown is limited to top 5 results
- [ ] User can click a search button to see all results for given search
- [ ] Style new elements for Search result page (filtered question index)

### Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Pagination / infinite scroll for Questions Index
- [ ] Multiple sessions
- [ ] Upvote/downvote buttons
