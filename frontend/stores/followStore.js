var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var FollowConstants = require("../constants/FollowConstants");

var FollowStore = new Store(AppDispatcher);

var _follows = {Topic: {}, User: {}, Question: {}};

var removeFollow = function(follow){
  var type = follow.followableType;
  var id = follow.followableId;
  delete _follows[type][id];
};

FollowStore.find = function(followableType, followableId){
  return _follows[followableType][followableId];
};

FollowStore.isFollowing = function(followableType, followableId){
  var follow = _follows[followableType][followableId];
  return follow ? true : false;
};

var addFollow = function(follow){
  var type = follow.followableType;
  var id = follow.followableId;
  _follows[type][id] = follow;
};

var addAllFollows = function(follows){
  for (var i = 0; i < follows.length; i++) {
    var follow = follows[i];
    var type = follow.followable_type;
    var followable_id = follow.followable_id;
    _follows[type][followable_id] = follow;
  }
};

FollowStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case FollowConstants.RECEIVE_FOLLOWS:
      addAllFollows(payload.follows);
      this.__emitChange();
      break;
    case FollowConstants.RECEIVE_FOLLOW:
      addFollow(payload.follow);
      this.__emitChange();
      break;
    case FollowConstants.REMOVE_FOLLOW:
      removeFollow(payload.follow);
      this.__emitChange();
      break;
  }
};

module.exports = FollowStore;
