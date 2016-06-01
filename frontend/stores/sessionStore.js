var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/SessionConstants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;

var SessionStore = new Store(AppDispatcher);

SessionStore.isUserLoggedIn = function(){
  var logged_in = _currentUser.id ? true : false;
  return logged_in;
};

SessionStore.currentUser = function(){
  return _currentUser;
};

SessionStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case SessionConstants.LOGIN:
      _currentUser = payload.user;
      _currentUserHasBeenFetched = true;
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _currentUser = {};
      _currentUserHasBeenFetched = false;
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
