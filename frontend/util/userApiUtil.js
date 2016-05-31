var SessionActions = require("../actions/SessionActions");

var UserApiUtil = {
  signup: function(user){
    $.ajax({
      url: "api/user",
      type: "POST",
      data: {user: user},
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      }
    });
  }
};

module.exports = UserApiUtil;
