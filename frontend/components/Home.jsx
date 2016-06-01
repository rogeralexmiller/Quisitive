var React = require("react");
var LogoutButton = require("./LogoutButton");
var SessionStore = require("../stores/sessionStore");
var UserNavItem = require("./UserNavItem");

var Home = React.createClass({

  render: function(){

    return (
      <div>
        <UserNavItem/>
        <LogoutButton/>
        Welcome to Quisitive!
      </div>
    );
  }
});

module.exports = Home;
