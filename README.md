# Quisitive

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

##  Minimum Viable Product

Quisitive is a web application inspired by Quora that will be built with Ruby on Rails and React.js. By the
end of week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for a Quora-inspired site: question asking, editing, answering, searching,
topic feeds, an infinite scrolling feed of questions/answers.
- [ ] Hosting on Heroku
- [ ] CSS styling that is elegant and similar to the real Quora.
- [ ] A production README, replacing this README

## Product Goals and Priorities

Quisitive will allow users to do the following:

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Ask, read, answer, edit and delete answers(MVP)
- [ ] Follow topic feeds of questions (MVP)
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

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Question Model, API, and basic APIUtil (1.5 days)

**Objective:** Questions can be created, read, edited and destroyed through
the API.

- [ ] create `Question` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for questions (`QuestionsController`)
- [ ] jBuilder views for questions
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Questions can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each question component, building out the flux loop as needed.
  - [ ] `QuestionsIndex`
  - [ ] `QuestionIndexItem`
  - [ ] `NewQuestionForm`
  - [ ] `EditQuestionForm`
- [ ] save Questions to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days)

**Objective:** Questions index, QuestionShow pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Answers (1 day)

**Objective:** Answers belong to Questions, and can be viewed by QuestionDetail. The top rated answer for each question will be shown in the questionIndex

- [ ] create `Answer` model
- build out API, Flux loop, and components for:
  - [ ] Answer CRUD
  - [ ] adding answers requires a question
- Use CSS to style updated QuestionDetail page

### Phase 6: Comments (1 day)

**Objective:** Comments belong to Answers, and can be viewed in AnswerIndex on a dropdown

- [ ] create `Comments` model
- build out API, Flux loop, and components for:
- [ ] Comments CRUD
- [ ] adding comments requires an answer
- Use CSS to style updated QuestionDetail page


### Phase 7: TopicTags (1.5 days)

**Objective:** Questions can be tagged with multiple topic tags

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for question
  - [ ] adding tags to question
  - [ ] creating tags while creating questions
  - [ ] Viewing all questions tagged as a topic.
- [ ] Style new elements for TopicDetail page (filtered question index)

### Phase 8: Give question form ability to run searches on previously asked questions (1.5 days)

**objective:** Enable question searches

- [ ] Create searchResult dropdown component that responds to question input
- [ ] Dropdown is limited to top 5 results
- [ ] User can click a search button to see all results for given search
- [ ] Style new elements for Search result page (filtered question index)

### Phase 9: Allow Complex Styling in Answers (0.5 days)

**objective:** Enable complex styling of answers.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 10: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and quora-like.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Pagination / infinite scroll for Questions Index
- [ ] Multiple sessions
