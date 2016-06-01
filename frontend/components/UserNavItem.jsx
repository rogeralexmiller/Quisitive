var React = require("react");
var SessionStore = require("../stores/sessionStore");
var SessionApiUtil = require("../util/sessionApiUtil");

var UserNavItem = React.createClass({
  getInitialState: function(){
    var potentialUser = SessionStore.currentUser();
    var user = potentialUser ? potentialUser : {};
    return {user: user.full_name};
  },

  _onChange: function(){
    var potentialUser = SessionStore.currentUser();
    var user = potentialUser ? potentialUser : {};
    this.setState({user: user.full_name});
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
      <div className="user-nav-item">
        {this.state.user}
      </div>
    );
  }
});

module.exports = UserNavItem;
