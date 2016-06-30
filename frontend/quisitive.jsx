var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

//Components
var QuestionsIndex = require("./components/QuestionsIndex");
var SessionStore = require("./stores/sessionStore");
var LoginSignup = require("./components/LoginSignup");
var QuestionShow = require("./components/QuestionShow");
var SessionApiUtil = require("./util/sessionApiUtil");
var FollowedTopicsIndex = require("./components/FollowedTopicsIndex");
var AnswerIndex = require("./components/AnswerIndex");
var TopicShow = require("./components/TopicShow");
var HeaderNav = require("./components/HeaderNav");

var UserShow = require("./components/UserShow");

var Modal = require("react-modal");

var App = React.createClass({
  getInitialState: function(){
    var loginState = SessionStore.isUserLoggedIn();
    return {loginState: loginState};
  },

  onChange: function(){
    var loginState = SessionStore.isUserLoggedIn();
    this.setState({loginState: loginState});
  },

  componentDidMount: function(){
    this.listener = SessionStore.addListener(this.onChange);
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  render: function(){
    var header = this.state.loginState? <HeaderNav/> : <div></div>;
    return (
      <div>
        {header}
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
      <Route path="questions" onEnter={_ensureLoggedIn} component={QuestionsIndex}>
        <IndexRoute component={FollowedTopicsIndex}/>
      </Route>
      <Route path="questions/:questionId" onEnter={_ensureLoggedIn} component={QuestionShow}>
        <IndexRoute component={AnswerIndex} />
      </Route>
      <Route path="topics/:topicId" onEnter={_ensureLoggedIn} component={TopicShow}>
        <IndexRoute component={FollowedTopicsIndex}/>
      </Route>
      <Route path="users/:userId" onEnter={_ensureLoggedIn} component={UserShow}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  Modal.setAppElement(root);
  ReactDOM.render(Router, root);
});
