var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TopicSearchConstants = require("../constants/TopicSearchConstants");

var TopicSearchStore = new Store(AppDispatcher);

_results = {};

TopicSearchStore.results = function(){
  return JSON.parse(JSON.stringify(_results));
};

TopicSearchStore.__onDispatch = function(payload){
  switch(payload.actionType) {
    case TopicSearchConstants.RECEIVE_TOPIC_RESULTS:
      _results = payload.results;
      TopicSearchStore.__emitChange();
      break;
  }
};

module.exports = TopicSearchStore;
