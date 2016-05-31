
var SessionApiUtil = {

  fetchCurrentUser: function(){
    $.ajax({
      url: "api/session",
      type: "GET",
      success: function(data){
      }
    });
  },
  login: function(credentials){
    $.ajax({
      url: "api/session",
      type: "POST",
      data: credentials,
      success: function(data){
      }
    });
  },

  logout: function(){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      success: function(data){

      }
    });
  }
};

module.exports = SessionApiUtil;
