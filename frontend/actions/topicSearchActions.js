var AppDispatcher = require("../dispatcher/dispatcher");
var TopicSearchConstants = require("../constants/TopicSearchConstants");

var TopicSearchActions = {
  receiveResults: function(results){
    AppDispatcher.dispatch({
      actionType: TopicSearchConstants.RECEIVE_TOPIC_RESULTS,
      results: results
    });
  }
};

module.exports = TopicSearchActions;
