var SessionActions = require("../actions/SessionActions");

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
      data: credentials,
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      }
    });
  },

  logout: function(){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      success: function(user){
        SessionActions.removeCurrentUser(user);
      }
    });
  }
};

module.exports = SessionApiUtil;
