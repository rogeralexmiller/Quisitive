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
var Home = require("./components/Home");
var HeaderNav = require("./components/HeaderNav");


var App = React.createClass({
  render: function(){
    var user = SessionStore.currentUser()
    return (
      <div>
        <HeaderNav/>
        {this.props.children}
      </div>
    );
  }
});

var _ensureLoggedIn = function(){

};

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LoginSignup}/>
      <Route path="/login" component={LoginSignup}/>
      <Route path="/signup" component={LoginSignup}/>
      <Route path="/questions" onEnter={_ensureLoggedIn}component={QuestionsIndex}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
