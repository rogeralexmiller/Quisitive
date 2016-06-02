var React = require("react");
var LogoutButton = require("./LogoutButton");
var SessionStore = require("../stores/sessionStore");
var SessionApiUtil = require("../util/sessionApiUtil");

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
      <header className="header-nav group">
        <span> {this.state.currentUser.full_name}</span>
        <LogoutButton/>
      </header>
    );
  }
});

module.exports = HeaderNav;
