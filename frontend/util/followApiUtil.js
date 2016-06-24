
var FollowApiUtil = {
  createFollow: function(followableType, followableId){
    $.ajax({
      type: "POST",
      url: "api/follows",
      data: {followable_type: followableType,
        followable_id: followableId
      },
      success: function(data){
        console.log(data);
      }
    });
  },

  removeFollow: function(followId){
    $.ajax({
      type: "DELETE",
      url: "api/follows/"+followId,
      success: function(data){
        console.log(data);
      }
    });
  }
};

module.exports = FollowApiUtil;
