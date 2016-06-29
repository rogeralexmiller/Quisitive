var FollowActions = require("../actions/followActions");

var FollowApiUtil = {

  getUserFollows: function(){
    $.ajax({
      type: "GET",
      url: "api/follows",
      success: function(follows){
        FollowActions.receiveFollows(follows);
      }
    });
  },

  createFollow: function(followableType, followableId){
    $.ajax({
      type: "POST",
      url: "api/follows",
      data: {
        follow: {
          followable_type: followableType,
          followable_id: followableId
        }
      },
      success: function(follow){
        FollowActions.receiveFollow(follow);
      }
    });
  },

  removeFollow: function(follow){
    $.ajax({
      type: "DELETE",
      url: "api/follows/"+follow.id,
      success: function(follow){
        FollowActions.removeFollow(follow);
      }
    });
  }
};

module.exports = FollowApiUtil;
