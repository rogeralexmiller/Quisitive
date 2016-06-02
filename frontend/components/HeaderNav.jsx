var React = require("react");
var LogoutButton = require("./LogoutButton");
var SessionStore = require("../stores/sessionStore");
var SessionApiUtil = require("../util/sessionApiUtil");
var UserNavItem = require("./UserNavItem");
var QuestionSearchForm = require("./QuestionSearchForm");

var HeaderNav = React.createClass({

  getInitialState: function(){
    return {currentUser: SessionStore.currentUser()};
  },

  _onChange: function(){
    this.setState({currentUser: SessionStore.currentUser()});
  },

  componentDidMount: function(){
    this.listener = SessionStore.addListener(this._onChange);
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  render: function(){
    return (
      <header className="header">
        <nav className="header-nav group">
          <h1 className="header-logo">
            <a href="#/questions">
              Quisitive
            </a>
          </h1>
          <QuestionSearchForm/>
          <ul className="header-list group">
            <li> <UserNavItem/> </li>
            <li> <LogoutButton/> </li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = HeaderNav;
