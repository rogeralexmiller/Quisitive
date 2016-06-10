var React = require("react");
var LoginForm = require("./LoginForm");
var SignupForm = require("./SignupForm");

var LoginSignup = React.createClass({
  render: function(){
    return(
      <div>
      <h1 className="head-title"> Quisitive </h1>
      <p className="tagline"> For the curious </p>
        <div className="signup-login group">
          <SignupForm/>
          <LoginForm/>
          <a href="/auth/twitter">Sign in with Twitter</a>
        </div>
      </div>
    );
  }
});

module.exports = LoginSignup;
