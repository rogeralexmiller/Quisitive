var React = require("react");
var SessionStore = require("../stores/sessionStore");
var ErrorStore = require("../stores/errorStore");

var UserShow = React.createClass({
  getInitialState: function(){
    var potentialUser = SessionStore.currentUser();
    var user = potentialUser ? potentialUser : {};
    return {user: user, disabled: true, errors: {}, showUpdate: false};
  },

  checkReadyState: function(){
    if (this.state.email && this.state.password) {
      this.setState({disabled: false});
    } else{
      this.setState({disabled: true});
    }
  },

  handleEmailChange: function(e){
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },

  _onChange: function(){
    this.setState({user: SessionStore.currentUser()});
    if (ErrorStore.form() === "update"){
      this.setState({errors: ErrorStore.formErrors("login")});
    }
  },

  componentDidMount: function(){
    this.changeListener = SessionStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this._onChange);
    SessionApiUtil.fetchCurrentUser();

  },

  componentWillUnmount: function(){
    this.changeListener.remove();
    this.errorListener.remove();
  },

  handleSubmit: function(e){
    e.preventDefault();
    var userData = {
      email: this.state.email,
      password: this.state.password
    };
    SessionApiUtil.login(userData);
  },

  render: function(){
    return(
        <div className="user-show">
          <h1 className="">{this.state.user.full_name}</h1>
          <h2>{this.state.user.email}</h2>
          <button className="submit-button">Change Password?</button>
          <form onSubmit={this.handleSubmit} className="update-user-form group">
            <h3 className="form-title">Update</h3>
            <input
              id="email"
              type="text"
              className="form-input"
              onKeyUp={this.checkReadyState}
              onChange={this.handleEmailChange}
              value={this.state.email}
              placeholder="Email"
            />
            <input
              id="password"
              type="password"
              className="form-input"
              onKeyUp={this.checkReadyState}
              onChange={this.handlePasswordChange}
              value={this.state.password}
              placeholder="Password"
            />

            <input
              className="submit-button form-button"
              disabled={this.state.disabled}
              type="submit" value="Login"
            />
            <span className="errors">{this.state.errors.base}</span>
          </form>
        </div>
    )
  }
});

module.exports = UserShow;
