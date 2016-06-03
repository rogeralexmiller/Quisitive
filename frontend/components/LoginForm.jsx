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
  },

  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },

  _onChange: function(){
    if (SessionStore.isUserLoggedIn()){
      this.context.router.push("/questions")
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
        <form onSubmit={this.handleSubmit} className="login-form group">
          <h3 className="form-title">LOGIN</h3>

          <input id="email" type="text" className="form-input" onKeyUp={this.checkReadyState} onChange={this.handleEmailChange} value={this.state.email} placeholder="Email"/>
          <input id="password" type="password" className="form-input" onKeyUp={this.checkReadyState} onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password"/>

          <input className="submit-button form-button" disabled={this.state.disabled} type="submit" value="Login" />

          <span className="errors">{this.state.errors.base}</span>
        </form>
    )
  }
});

module.exports = LoginForm;
