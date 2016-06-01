var React = require("react");
var SessionApiUtil = require("../util/sessionApiUtil");
var UserApiUtil = require("../util/userApiUtil");
var SessionStore = require("../stores/sessionStore");

var LoginForm = React.createClass({

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
    this.checkReadyState();
  },

  handleNameChange: function(e){
    this.setState({full_name: e.target.value});
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

    var userData = {
      email: this.state.email,
      password: this.state.password,
      full_name: this.state.full_name
    };
    UserApiUtil.signup(userData);
  },

  render: function(){
    return(
      <form onSubmit={this.handleSubmit} className="signup-form">
        <h3 className="form-title">SIGN UP</h3>
        <div className="formRow group">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" onChange={this.handleEmailChange} className="form-input signup-input" value={this.state.email}/>
        </div>

        <div className="formRow group">
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" onChange={this.handleNameChange} className="form-input signup-input" value={this.state.full_name}/>
        </div>

        <div className="formRow group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="form-input signup-input" onChange={this.handlePasswordChange} value={this.state.password}/>
        </div>
        <input className="good-button" type="submit" value="Sign Up" disabled={this.state.disabled}/>
      </form>
    )
  }
});

module.exports = LoginForm;
