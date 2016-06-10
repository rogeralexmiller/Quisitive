var React = require("react");
var SessionApiUtil = require("../util/sessionApiUtil");
var UserApiUtil = require("../util/userApiUtil");
var SessionStore = require("../stores/sessionStore");
var ErrorStore = require("../stores/errorStore");

var SignupForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {email: "", password: "", full_name: "", disabled: true, errors: {}};
  },

  checkReadyState: function(){
    if (this.state.email && this.state.password && this.state.full_name) {
      this.setState({disabled: false});
    } else{
      this.setState({disabled: true});
    }
  },

  handleEmailChange: function(e){
    this.setState({email: e.target.value});
  },

  handleNameChange: function(e){
    this.setState({full_name: e.target.value});
  },

  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },

  _onChange: function(){
    if (SessionStore.isUserLoggedIn()){
      this.context.router.push("#/questions")
    }
    if (ErrorStore.form() === "signup"){
      this.setState({errors: ErrorStore.formErrors("signup")});
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
      password: this.state.password,
      full_name: this.state.full_name
    };
    UserApiUtil.signup(userData);
  },


  handleGuest: function(e){
    e.preventDefault();
    var userData = {
      email: "guest@test.com",
      password: "password"
    };
    SessionApiUtil.login(userData);
  },

  render: function(){
    return(
      <form onSubmit={this.handleSubmit} className="signup-form">
        <h3 className="form-title">SIGN UP</h3>
        <div className="formRow group">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" onChange={this.handleEmailChange} onKeyUp={this.checkReadyState} className="form-input signup-input" value={this.state.email}/>
        </div>
        <span className="errors">{this.state.errors.email}</span>

        <div className="formRow group">
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" onChange={this.handleNameChange} onKeyUp={this.checkReadyState} className="form-input signup-input" value={this.state.full_name}/>
        </div>
        <span className="errors">{this.state.errors.full_name}</span>

        <div className="formRow group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="form-input signup-input" onKeyUp={this.checkReadyState} onChange={this.handlePasswordChange} value={this.state.password}/>
        </div>
        <span className="errors">{this.state.errors.password}</span>


        <input className="submit-button form-button" type="submit" value="Sign Up" disabled={this.state.disabled}/>
        <button id="guest-button" onClick={this.handleGuest} className="submit-button form-button">Guest Login</button>
        <a className="twitter-auth submit-button form-button" href="/auth/twitter">Twitter Login</a>
      </form>
    )
  }
});

module.exports = SignupForm;
