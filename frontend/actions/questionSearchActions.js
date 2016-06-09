var AppDispatcher = require("../dispatcher/dispatcher");
var QuestionSearchConstants = require("../constants/QuestionSearchConstants");

var QuestionSearchActions = {
  receiveResults: function(results){
    AppDispatcher.dispatch({
      actionType: QuestionSearchConstants.RECEIVE_QUESTION_RESULTS,
      results: results
    });
  }
};

module.exports = QuestionSearchActions;
