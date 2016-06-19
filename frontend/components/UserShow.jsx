var React = require("react");
var SessionStore = require("../stores/sessionStore");
var ErrorStore = require("../stores/errorStore");
var SessionApiUtil = require("../util/sessionApiUtil");
var UserApiUtil = require("../util/userApiUtil");

var UserShow = React.createClass({
  getInitialState: function(){
    var potentialUser = SessionStore.currentUser();
    var user = potentialUser ? potentialUser : {};
    var editUser = JSON.parse(JSON.stringify(user));
    return ({
      user: user,
      editUser: editUser,
      errors: {},
      updateName: false,
      updateEmail: false,
      updatePassword: false
    });
  },

  handleEmailChange: function(e){
    var user = this.state.editUser;
    user.email = e.target.value;
    this.setState({editUser: user});
  },

  handlePasswordChange: function(e){
    var user = this.state.editUser;
    user.password = e.target.value;
    this.setState({editUser: user});
  },

  handleNameChange: function(e){
    var user = this.state.editUser;
    user.full_name = e.target.value;
    this.setState({editUser: user});
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

  editName: function(){
    this.setState({updateName:true})
  },
  editEmail: function(){
    this.setState({updateEmail:true})
  },
  editPassword: function(e){
    e.preventDefault();
    this.setState({updatePassword:true})
  },

  handleSubmit: function(e){
    e.preventDefault();
    UserApiUtil.updateUser(this.state.editUser);
    this.setState({
      updateName: false,
      updateEmail: false,
      updatePassword: false
    });
  },

  cancelNameUpdate: function(){
    this.setState({updateName: false});
  },

  cancelEmailUpdate: function(){
    this.setState({updateEmail: false});
  },

  cancelPasswordUpdate: function(){
    this.setState({updatePassword: false});
  },

  render: function(){
    var nameHeader = this.state.updateName ? "hidden" : "name-header profile-header";
    var emailHeader = this.state.updateEmail ? "hidden" : "email-header profile-header";
    var passwordButton = this.state.updatePassword ? "hidden" : "submit-button change-password";

    var updateName = this.state.updateName ? "edit-name" : "hidden";
    var updateEmail = this.state.updateEmail ? "edit-email" : "hidden";
    var updatePassword = this.state.updatePassword ? "form-password" : "hidden";
    debugger;
    return(
        <div className="user-show">

          <form onSubmit={this.handleSubmit} className="update-user-form group">

            <div className={nameHeader}>
              <h2>{this.state.user.full_name}</h2>
              <span onClick={this.editName}> Edit </span>
            </div>
            <div className={updateName}>
              <input
                className="form-input"
                id="full-name"
                type="text"
                onChange={this.handleNameChange}
                value={this.state.editUser.full_name}
                placeholder="Email"
              />
              <input
                className="submit-button form-button"
                type="submit" value="Update Name"
              />
              <span className="cancelAnswer" onClick={this.cancelNameUpdate}>Cancel</span>
            </div>

            <div className={emailHeader}>
              <h2>{this.state.user.email}</h2>
              <span onClick={this.editEmail}> Edit </span>
            </div>
            <div className={updateEmail}>
              <input
                className="form-input"
                id="email"
                type="text"
                onChange={this.handleEmailChange}
                value={this.state.editUser.email}
                placeholder="Email"
              />
              <input
                className="submit-button form-button"
                type="submit" value="Update Email"
              />
              <span className="cancelAnswer" onClick={this.cancelEmailUpdate}>Cancel</span>
            </div>


            <button
              className={passwordButton}
              onClick={this.editPassword}
            >
              Change Password
            </button>
            <div className={updatePassword}>
              <input
                className="form-input"
                id="password"
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.editUser.password}
                placeholder="Password"
              />
              <input
                className="submit-button form-button"
                type="submit" value="Update Password"
              />
              <span className="cancelAnswer" onClick={this.cancelPasswordUpdate}>Cancel</span>
            </div>

            <span className="errors">{this.state.errors.base}</span>
          </form>
        </div>
    );
  }
});

module.exports = UserShow;
