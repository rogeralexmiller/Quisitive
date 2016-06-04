var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/SessionConstants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;

var SessionStore = new Store(AppDispatcher);


var _login = function(currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
};

var _logout = function() {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
};

SessionStore.currentUserOwns = function(entity){
  if (entity.author_id === _currentUser.id) {
    return true;
  } else{
    return false;
  }
};

SessionStore.isUserLoggedIn = function(){
  return !!_currentUser.id;
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.currentUser = function(){
  return $.extend({},_currentUser);
};

SessionStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case SessionConstants.LOGIN:
      _login(payload.user);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _logout();
      SessionStore.__emitChange();
      break;
  }
};

module.exports = SessionStore;
