var React = require("react");
var SessionApiUtil = require("../util/sessionApiUtil");
var SessionStore = require("../stores/sessionStore");
var ErrorStore = require("../stores/errorStore");

var LoginForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {email: "", password: "", disabled: true, errors: {}};
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
    this.checkReadyState();
  },

  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
    this.checkReadyState();
  },

  _onChange: function(){
    if (SessionStore.isUserLoggedIn()){
      this.context.router.push("/")
    }
    if (ErrorStore.form() === "login"){
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
      <div>
        <form onSubmit={this.handleSubmit} className="login-form group">
          <h3>Login</h3>

          <input id="email" type="text" className="login-form-input" onChange={this.handleEmailChange} value={this.state.email} placeholder="Email"/>
          <input id="password" type="password" className="login-form-input" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password"/>

          <input className="good-button" disabled={this.state.disabled} type="submit" value="Login" />
        </form>
        <span className="errors">{this.state.errors.base}</span>
      </div>
    )
  }
});

module.exports = LoginForm;
