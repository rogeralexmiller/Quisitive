var React = require("react");
var SessionApiUtil = require("../util/sessionApiUtil");
var SessionStore = require("../stores/sessionStore");
var SessionApiUtil = require("../util/sessionApiUtil");
var SessionActions = require("../actions/SessionActions");

var LogoutButton = React.createClass({
  getInitialState: function(){
    return {loggedIn: SessionStore.isUserLoggedIn()};
  },

  _onChange: function(){
    this.setState({loggedIn: SessionStore.isUserLoggedIn()});
  },

  componentDidMount: function(){
    this.listener = SessionStore.addListener(this._onChange);
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleLogout: function(){
    SessionApiUtil.logout();
    this.context.router.push("/login")
  },

  render: function(){
    var loginClass = this.state.loggedIn ? "logout-btn loggedIn" : "logout-btn loggedOut";
    return (
      <button onClick={this.handleLogout} className={loginClass}>
        Logout
      </button>
    )
  }
});

module.exports = LogoutButton;
