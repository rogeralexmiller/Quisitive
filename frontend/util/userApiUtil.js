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
      error: function(xhr){
        var errors = xhr.responseJSON;
        ErrorActions.clearErrors();
        ErrorActions.setErrors("signup", errors);
      }
    });
  },

  updateUser: function(user){
    $.ajax({
      url: "api/users/"+user.id,
      type: "PATCH",
      data: {user: user},
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      },
      error: function(xhr){
        var errors = xhr.responseJSON;
        ErrorActions.clearErrors();
        ErrorActions.setErrors("update", errors);
      }
    });
  },
};

module.exports = UserApiUtil;
