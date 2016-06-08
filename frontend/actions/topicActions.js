var AppDispatcher = require("../dispatcher/dispatcher");
var TopicConstants = require("../constants/TopicConstants");

var TopicActions = {
  receiveTopics: function(topics){
    AppDispatcher.dispatch({
      actionType: TopicConstants.RECEIVE_TOPICS,
      topics: topics
    });
  },

  receiveTopic: function(topic){
    AppDispatcher.dispatch({
      actionType: TopicConstants.RECEIVE_TOPIC,
      topic: topic
    });
  },

  removeTopic: function(topic){
    AppDispatcher.dispatch({
      actionType: TopicConstants.REMOVE_TOPIC,
      topic: topic
    });
  }
};

module.exports = TopicActions;
