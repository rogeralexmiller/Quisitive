var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var SessionStore = require("./stores/SessionStore");
var SessionActions = require("./actions/SessionActions");
var UserApiUtil  = require("./util/userApiUtil");
var SessionApiUtil = require('./util/sessionApiUtil');

var LoginForm = require("./components/LoginForm");
var SignupForm = require("./components/SignupForm");
var Home = require("./components/Home");

var App = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/signup" component={SignupForm}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
