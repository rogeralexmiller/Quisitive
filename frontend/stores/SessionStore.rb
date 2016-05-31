var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/session_constants');

var SessionStore = new Store(AppDispatcher);



module.exports = SessionStore;
