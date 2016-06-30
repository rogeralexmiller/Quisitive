var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TopicConstants = require("../constants/TopicConstants");
var FollowStore = require("./followStore");

var TopicStore = new Store(AppDispatcher);
var _topics = [];

TopicStore.all = function(){
  return _topics.slice();
};

TopicStore.followedTopics = function(){
  return _topics.filter(function(topic){
    return FollowStore.isFollowing("Topic", topic.id);
  });
};

TopicStore.find = function(id){
  for (var i = 0; i < _topics.length; i++) {
    if (_topics[i].id === parseInt(id)) {
      return _topics[i];
    }
  }
};

var addTopic = function(newTopic){
  for (var i = 0; i < _topics.length; i++) {
    var topic = _topics[i];
    if (topic.id === newTopic.id){
      return;
    }
  }
  _topics.push(newTopic);
};

var removeTopic = function(badTopic){
  _topics = _topics.filter(function(topic){
    return (topic.id !== badTopic.id);
  });
};

TopicStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case TopicConstants.RECEIVE_TOPICS:
      _topics = payload.topics;
      TopicStore.__emitChange();
      break;
    case TopicConstants.RECEIVE_TOPIC:
      addTopic(payload.topic);
      TopicStore.__emitChange();
      break;
    case TopicConstants.REMOVE_TOPIC:
      removeTopic(payload.topic.id);
      TopicStore.__emitChange();
      break;
  }
};

module.exports = TopicStore;
