var SessionActions = require("../actions/SessionActions");
var ErrorActions = require("../actions/errorActions");

var SessionApiUtil = {

  fetchCurrentUser: function(){
    $.ajax({
      url: "api/session",
      type: "GET",
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      }
    });
  },

  login: function(credentials){
    $.ajax({
      url: "api/session",
      type: "POST",
      data: {user:credentials},
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      },
      error: function(xhr){
        var errors = xhr.responseJSON;
        ErrorActions.clearErrors();
        ErrorActions.setErrors("login", errors);
      }
    });
  },

  logout: function(){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      success: function(){
        SessionActions.removeCurrentUser();
      }
    });
  }
};

module.exports = SessionApiUtil;
