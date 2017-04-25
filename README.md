# Quisitive

[Quisitive live][heroku]

[heroku]: http://quisitive.herokuapp.com/

Quisitive is a full-stack web application modeled on Quora.  It relies on Ruby on Rails for the backend with a PostgreSQL database, and React.js with Flux for the frontend.  

## Features & Implementation

### One page to rule them all

Quisitive is a single-page app, meaning that all the content is loaded on one static page. Thanks to React-Router, though, the url changes to reflect which components are currently being rendered.  The root listens to a `SessionStore` and renders content based on a call to the store's `#currentUser()` method. Users' private information is kept safe and sound out of the frontend of the app by making an API call to `SessionsController#show`.

```ruby
class Api::SessionsController < ApplicationController
    def show
      if current_user
        @user = current_user
        render "api/users/show"
      else
        render json: errors.full_messages
      end
    end
 end
  ```

### Question Asking, Showing and Editing

  In the database, questions are stored in a table containing columns for `id`, `author_id`, `body`, `created_at` and `updated_at`.  Once someone logs in, they are brought to a main questions index feed where every question is loaded by the database and displayed alongside its author.

  Questions are rendered in three components throughout the app: `QuestionsIndex`, which renders the aforementioned index view, `QuestionShow`, which renders the individual question `show` pages that display questions' answers and tagged topics, and `TopicShow`, which renders all the questions tagged with a particular topic as a subcomponent. In all three of these components, the full question body is visible, but questions can only be edited in the `QuestionShow` component.

  Question asking and searching are handled by the `QuestionSearchForm` component, which is rendered by the `HeaderNav` component. The `QuestionSearchForm` is a real workhorse. While users are typing in a question, textually similar questions are searched for and displayed in a dropdown. If a user sees a question they are interested in or that asks the question they were interested in, they can click it to go see the `show` page for that question.

  Quisitive's UI was designed to imitate Quora's to keep things simple and clean:  

![questions-index]
[questions-index]: ./docs/IndexScreenshot.png

### Answers

  Answers are stored in the database with a relationship to the question it answers. The `Answers` table is identical to the `Questions` table except for an additional column `question_id` which is used to connect the answer to its question.

  Answers are always rendered in relation to a question so the only component that is responsible for rendering answers is the `QuestionShow` component, which renders all its associated answers as child components. This child component, `AnswerIndex` is responsible for creating new answers and rendering its subcomponents, `AnswerIndexItems`, which in turn are responsible for handling answer editing and deletion, as well as answer comments.

### Comments

Comments are represented in the database in a similar fashion to answers, but with a twist: the `comments` table has the standard `id`, `author_id`, and `body` columns, but also has `commentable_id` and `commentable_type` columns that allow comments to be associated with both questions AND answers. This then enables the app to create a comment for a question or answer using the same API POST Request:

Comment POST Request in `frontend/util/commentApiUtil`:
```JavaScript
...
createComment: function(comment){
  var lowerType = comment.commentableType.slice(0,1).toLowerCase()+comment.commentableType.slice(1);
  var commentData = {
    body: comment.body,
    commentable_type: comment.commentableType,
    commentable_id: comment.commentableId
  };
  $.ajax({
    url: "api/" + lowerType + "s/" + comment.commentableId + "/comments",
    type: "POST",
    data: {comment: commentData},
    success: function(comment){
      CommentActions.receiveComment(comment);
    }
  });
}
...
```
comments are maintained on the frontend in the `CommentStore` and are rendered as children three components: `QuestionsIndex`, `QuestionShow`, and `AnswerIndexItem`.

![comments-screenshot]
[comments-screenshot]: ./docs/Comments.png

### Topics

Topics are represented in the database through both `topics` table and a join table called `topic_taggings`.  The `topics` table has columns for `id`, the topic's `name` and it's author's `author_id`.  The `topic_taggings` join table contains three columns: `id`, `topic_id`, and `question_id`.  

Topics are maintained on the frontend in the `TopicStore` and are rendered in three different components: `TopicIndex`, a sidebar component that is rendered alongside the `QuestionsIndex`, `TopicShow`, which renders an individual topic with all its associated questions as well as the `TopicIndex`, and `QuestionTopics`, which displays all the topics tagged to a given question. This last component is also responsible for adding, editing and removing topic-question associations.

![question-topics-screenshot]
[question-topics-screenshot]: ./docs/QuestionTopics.png

### Follows

Follows are essentially a connection between users and topics, and as such are stored in a `follows` table
that stores the `follower_id`, `followable_id` and `followable_type`. Like comments, follows are polymorphic,
meaning that the table can support users following both topics and questions.
In the future I plan on implementing question follows, but for now, users can only follow topics.

On the frontend, follows are stored in the `followStore` and follows are rendered as a follow/unfollow toggle button
 in the `TopicIndex`, `FollowedTopicsIndex` and `TopicShow` components.

## Future Goals

In addition to the features already implemented, I plan to continue work on this project.  The next steps for Quisitive are outlined below.

### Question and Answer upvoting and downvoting

This is another nice feature that I would like to implement since it adds a metric to rate and sort content. I plan on implementing this by adding another table with a polymorphic association. This table will be called `votable` and will join users to either the question or answer they are upvoting or downvoting. This will also require adding `votes` columns to both the `questions` and `answers` tables
