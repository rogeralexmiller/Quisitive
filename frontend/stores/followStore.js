var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var FollowConstants = require("../constants/FollowConstants");

var FollowStore = new Store(AppDispatcher);

var _follows = {Topic: [], User: [], Question: []};

var removeFollow = function(follow){
  var type = follow.followableType;
  var id = follow.followableId;
  var follows = _follows[type];
  _follows[type] = follows.filter(function(follow){
    return follow.followableId !== id;
  });
};

FollowStore.find = function(followableType, followableId){
  var follows = _follows[followableType];
  for (var i = 0; i < follows.length; i++) {
    if (follows[i].followableId === followableId) {
      return follows[i];
    }
  }
  return null;
};

FollowStore.isFollowing = function(followableType, followableId){
  var follows = _follows[followableType];
  for (var i = 0; i < follows.length; i++) {
    if (follows[i].followableId === followableId) {
      return true;
    }
  }
  return false;
};

var addFollow = function(follow){
  var type = follow.followableType;
  var id = follow.followableId;
  var follows = _follows[type];
  for (var i = 0; i < follows.length; i++) {
    if (follows[i].followableId === id) {
      return;
    }
  }
  _follows[type].push(follow);
};

var addAllFollows = function(follows){
  _follows.Topic = [];
  for (var i = 0; i < follows.length; i++) {
    var follow = follows[i];
    var type = follow.followableType;
    _follows[type].push(follow);
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
