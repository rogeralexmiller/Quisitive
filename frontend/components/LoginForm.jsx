var React = require("react");
var SessionApiUtil = require("../util/sessionApiUtil");
var SessionStore = require("../stores/SessionStore");

var LoginForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {email: "", password: ""};
  },

  handleEmailChange: function(e){
    this.setState({email: e.target.value});
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
      password: this.state.password
    }
    SessionApiUtil.login(userData);
  },

  render: function(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label for="email">Email</label>
        <input id="email" type="text" onChange={this.handleEmailChange} value={this.state.email}/>

        <label for="password">Password</label>
        <input id="password" type="password" onChange={this.handlePasswordChange} value={this.state.password}/>

        <input type="submit" value="Login" />
      </form>
    )
  }
});

module.exports = LoginForm;
