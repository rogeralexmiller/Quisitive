var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var QuestionSearchConstants = require("../constants/QuestionSearchConstants");

var QuestionSearchStore = new Store(AppDispatcher);

_results = [];

QuestionSearchStore.results = function(){
  return _results.slice();
};

QuestionSearchStore.__onDispatch = function(payload){
  switch(payload.actionType) {
    case QuestionSearchConstants.RECEIVE_QUESTION_RESULTS:
      _results = payload.results;
      QuestionSearchStore.__emitChange();
      break;
  }
};

module.exports = QuestionSearchStore;
