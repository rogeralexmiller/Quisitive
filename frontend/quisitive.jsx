var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var SessionStore = require("./stores/sessionStore");
var SessionActions = require("./actions/SessionActions");
var UserApiUtil  = require("./util/userApiUtil");
var SessionApiUtil = require('./util/sessionApiUtil');

var LoginSignup = require("./components/LoginSignup");
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
      <IndexRoute component={LoginSignup}/>
      <Route path="/login" component={LoginSignup}/>
      <Route path="/signup" component={LoginSignup}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
