var AppDispatcher = require("../dispatcher/dispatcher");
var FollowConstants = require("../constants/FollowConstants");

module.exports = {
  receiveFollows: function(follows){
    AppDispatcher.dispatch({
      actionType: FollowConstants.RECEIVE_FOLLOWS,
      follows: follows
    });
  },

  receiveFollow: function(follow){
    AppDispatcher.dispatch({
      actionType: FollowConstants.RECEIVE_FOLLOW,
      follow: follow
    });
  },

  removeFollow: function(follow){
    AppDispatcher.dispatch({
      actionType: FollowConstants.REMOVE_FOLLOW,
      follow: follow
    });
  }
};
