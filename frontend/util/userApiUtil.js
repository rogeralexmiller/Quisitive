var SessionActions = require("../actions/SessionActions");
var ErrorActions = require("../actions/errorActions");

var UserApiUtil = {
  signup: function(user){
    $.ajax({
      url: "api/user",
      type: "POST",
      data: {user: user},
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      },
      error: function(errors){
        debugger;
        ErrorActions.clearErrors();
        ErrorActions.setErrors(errors, "signup");
      }
    });
  }
};

module.exports = UserApiUtil;
