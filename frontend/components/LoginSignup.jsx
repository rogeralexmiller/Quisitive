var React = require("react");
var LoginForm = require("./LoginForm");
var SignupForm = require("./SignupForm");

var LoginSignup = React.createClass({
  render: function(){
    return(
      <div className="signup-login group">
        <SignupForm/>
        <LoginForm/>
      </div>
    );
  }
});

module.exports = LoginSignup;
