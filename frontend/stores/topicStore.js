var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TopicConstants = require("../constants/TopicConstants");

var TopicStore = new Store(AppDispatcher);
var topics = {};

TopicStore.all = function(){
  return JSON.parse(JSON.stringify(topics));
};

TopicStore.find = function(id){
  return topics[id];
};

var addTopic = function(topic){
  topics[topic.id] = topic;
};

TopicStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case TopicConstants.RECEIVE_TOPICS:
      topics = payload.topics;
      TopicStore.__emitChange();
      break;
    case TopicConstants.RECEIVE_TOPIC:
      topics[payload.topic.id] = payload.topic;
      TopicStore.__emitChange();
      break;
    case TopicConstants.REMOVE_TOPIC:
      delete topics[payload.topic.id];
      TopicStore.__emitChange();
      break;
  }
};

module.exports = TopicStore;
