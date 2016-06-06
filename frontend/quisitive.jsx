var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var QuestionsIndex = require("./components/QuestionsIndex");
var SessionStore = require("./stores/sessionStore");
var LoginSignup = require("./components/LoginSignup");

var SessionApiUtil = require("./util/sessionApiUtil");
var QuestionShow = require("./components/QuestionShow");

var AnswerStore = require("./stores/answerStore");
var AnswerApiUtil = require("./util/answerApiUtil");
var AnswerIndex = require("./components/AnswerIndex");

var CommentStore = require("./stores/commentStore");
var CommentApiUtil = require("./util/commentApiUtil");

var QuestionStore = require("./stores/questionStore");
var QuestionApiUtil = require("./util/QuestionApiUtil");

window.CommentStore = CommentStore;
window.CommentApiUtil = CommentApiUtil;

window.AnswerStore = AnswerStore;
window.AnswerApiUtil = AnswerApiUtil;

window.QuestionStore = QuestionStore;
window.QuestionApiUtil = QuestionApiUtil;

var App = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var _ensureLoggedIn = function(next_state, replace, asyncDoneCallback){
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn()
  } else{
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }

    asyncDoneCallback();
  }
};

var _ensureLoggedOut = function(next_state, replace, asyncDoneCallback){
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfLoggedIn()
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfLoggedIn);
  }

  function redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      replace('/questions');
    }

    asyncDoneCallback();
  }
};

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute onEnter={_ensureLoggedOut} component={LoginSignup}/>
      <Route path="login" onEnter={_ensureLoggedOut} component={LoginSignup}/>
      <Route path="signup" onEnter={_ensureLoggedOut} component={LoginSignup}/>
      <Route path="questions" onEnter={_ensureLoggedIn} component={QuestionsIndex}/>
      <Route path="questions/:questionId" onEnter={_ensureLoggedIn} component={QuestionShow}>
        <IndexRoute component={AnswerIndex} />
      </Route>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
