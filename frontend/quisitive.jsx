var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var LogoutButton = require("./components/LogoutButton");
var QuestionsIndex = require("./components/QuestionsIndex");
var SessionStore = require("./stores/sessionStore");
var LoginSignup = require("./components/LoginSignup");
var HeaderNav = require("./components/HeaderNav");
var SessionApiUtil = require("./util/sessionApiUtil");
var QuestionShow = require("./components/QuestionShow");

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
      <Route path="questions/:questionId" onEnter={_ensureLoggedIn} component={QuestionShow}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
