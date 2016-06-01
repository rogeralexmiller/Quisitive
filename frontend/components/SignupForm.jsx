var React = require("react");
var SessionApiUtil = require("../util/sessionApiUtil");
var UserApiUtil = require("../util/userApiUtil");
var SessionStore = require("../stores/sessionStore");

var LoginForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {email: "", password: "", full_name: ""};
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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" onChange={this.handleEmailChange} value={this.state.email}/>

        <label for="name">Full Name</label>
        <input id="name" type="text" onChange={this.handleNameChange} value={this.state.full_name}/>

        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={this.handlePasswordChange} value={this.state.password}/>

        <input type="submit" value="Signup" />
      </form>
    )
  }
});

module.exports = LoginForm;
