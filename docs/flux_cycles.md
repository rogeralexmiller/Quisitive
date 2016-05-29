# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Question Cycles

### Questions API Request Actions

* `fetchAllQuestions`
  0. invoked from `QuestionsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/questions` is called.
  0. `receiveAllQuestions` is set as the callback.

* `createQuestion`
  0. invoked from `NewQuestionForm` `onSubmit`
  0. `POST /api/questions` is called.
  0. `receiveSingleQuestion` is set as the callback.

* `fetchSingleQuestion`
  0. invoked from `questionDetail` `didMount`/`willReceiveProps`
  0. `GET /api/questions/:id` is called.
  0. `receiveSingleQuestion` is set as the callback.

* `updateQuestion`
  0. invoked from `EditQuestionForm` `onSubmit`
  0. `POST /api/questions/:questionId` is called.
  0. `receiveSingleQuestion` is set as the callback.

* `destroyquestion`
  0. invoked from delete question button `onClick`
  0. `DELETE /api/questions/:questionId` is called.
  0. `removeQuestion` is set as the callback.

### questions API Response Actions

* `receiveAllQuestions`
  0. invoked from an API callback.
  0. `question` store updates `_questions` and emits change.

* `receiveSingleQuestion`
  0. invoked from an API callback.
  0. `question` store updates `_questions[id]` and emits change.

* `removeQuestion`
  0. invoked from an API callback.
  0. `question` store removes `_questions[id]` and emits change.

### Store Listeners

* `questionsIndex` component listens to `question` store.
* `questionDetail` component listens to `question` store.


## Answer Cycles

### Answer API Request Actions

* `fetchAllAnswers`
  0. invoked from `answersIndex` `didMount`/`willReceiveProps`
  0. `GET /api/answers` is called.
  0. `receiveAllAnswers` is set as the callback.

* `createAnswer`
  0. invoked from new Answer button `onClick`
  0. `POST /api/answers` is called.
  0. `receiveSingleAnswer` is set as the callback.

* `updateAnswer`
  0. invoked from `EditAnswerForm` `onSubmit`
  0. `POST /api/answers/:answerId` is called.
  0. `receiveSingleAnswer` is set as the callback.

* `destroyAnswer`
  0. invoked from delete Answer button `onClick`
  0. `DELETE /api/answers/:id` is called.
  0. `removeAnswer` is set as the callback.

### answers API Response Actions

* `receiveAllAnswers`
  0. invoked from an API callback.
  0. `questionbook` store updates `_answers` and emits change.

* `receiveSingleAnswer`
  0. invoked from an API callback.
  0. `answer` store updates `_answers[id]` and emits change.

* `removeAnswer`
  0. invoked from an API callback.
  0. `answer` store removes `_answers[id]` and emits change.

### Store Listeners

* `answersIndex` component listens to `answer` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `questionSearchBar` `onChange` when there is text
  0. `GET /api/questions` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `questionSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.

## Comment Cycles

### Comment API Request Actions

* `fetchAllComments`
  0. invoked from `answersIndex` `didMount`/`willReceiveProps`
  0. `GET /api/answers` is called.
  0. `receiveAllComments` is set as the callback.

* `createComment`
  0. invoked from new Comment button `onClick`
  0. `POST /api/comments` is called.
  0. `receiveSingleComment` is set as the callback.

* `updateComment`
  0. invoked from `EditCommentForm` `onSubmit`
  0. `POST /api/comments/:commentId` is called.
  0. `receiveSingleComment` is set as the callback.

* `destroyComment`
  0. invoked from delete Comment button `onClick`
  0. `DELETE /api/comments/:id` is called.
  0. `removeComment` is set as the callback.

### Comments API Response Actions

* `receiveAllComments`
  0. invoked from an API callback.
  0. `comments` store updates `_comments` and emits change.

* `receiveSingleComment`
  0. invoked from an API callback.
  0. `answer` store updates `_comments[id]` and emits change.

* `removeComment`
  0. invoked from an API callback.
  0. `answer` store removes `_comments[id]` and emits change.

### Store Listeners

* `commentsIndex` component listens to `comment` store.
