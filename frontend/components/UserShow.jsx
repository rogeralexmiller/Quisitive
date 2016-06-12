var React = require("react");
var SessionStore = require("../stores/sessionStore");
var ErrorStore = require("../stores/errorStore");
var SessionApiUtil = require("../util/sessionApiUtil");
var UserApiUtil = require("../util/userApiUtil");

var UserShow = React.createClass({
  getInitialState: function(){
    var potentialUser = SessionStore.currentUser();
    var user = potentialUser ? potentialUser : {};
    return {user: user, disabled: true, errors: {}, showUpdate: false};
  },

  handleEmailChange: function(e){
    var user = this.state.user;
    user.email = e.target.value;
    this.setState({user: user});
  },

  handlePasswordChange: function(e){
    var user = this.state.user;
    user.password = e.target.value;
    this.setState({user: user});
  },

  handleNameChange: function(e){
    var user = this.state.user;
    user.full_name = e.target.value;
    this.setState({user: user});
  },

  _onChange: function(){
    this.setState({user: SessionStore.currentUser()});
    if (ErrorStore.form() === "update"){
      this.setState({errors: ErrorStore.formErrors("login")});
    }
  },

  componentDidMount: function(){
    this.changeListener = SessionStore.addListener(this._onChange);
    SessionApiUtil.fetchCurrentUser();

  },

  componentWillUnmount: function(){
    this.changeListener.remove();
  },

  handleSubmit: function(e){
    e.preventDefault();
    UserApiUtil.updateUser(this.state.user);
  },

  render: function(){
    return(
        <div className="user-show">
          <h1 className="">{this.state.user.full_name}</h1>
          <h2>{this.state.user.email}</h2>
          <form onSubmit={this.handleSubmit} className="update-user-form group">
            <h3 className="form-title">Update</h3>
            <input
              id="email"
              type="text"
              className="form-input"
              onChange={this.handleEmailChange}
              value={this.state.user.email}
              placeholder="Email"
            />
            <input
              id="full-name"
              type="text"
              className="form-input"
              onChange={this.handleNameChange}
              value={this.state.user.full_name}
              placeholder="Email"
            />
            <input
              id="password"
              type="password"
              className="form-input"
              onChange={this.handlePasswordChange}
              value={this.state.user.password}
              placeholder="Password"
            />

            <input
              className="submit-button form-button"
              type="submit" value="Update Information"
            />
            <span className="errors">{this.state.errors.base}</span>
          </form>
        </div>
    )
  }
});

module.exports = UserShow;
