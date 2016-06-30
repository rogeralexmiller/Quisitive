var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var TopicConstants = require("../constants/TopicConstants");
var FollowStore = require("./followStore");

var TopicStore = new Store(AppDispatcher);
var _topics = [];
var _topicHash = {};

var _questionTopics = [];

TopicStore.getQuestionTopics = function(){
  return _questionTopics.slice();
};

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
  if (!_topicHash[newTopic.id]) {
    _topics.push(newTopic);
    _topicHash[newTopic.id] = true;
  }
};

var removeTopic = function(badTopic){
  _topics = _topics.filter(function(topic){
    _topicHash[topic.id] = false;
    return (topic.id !== badTopic.id);
  });
};

var receiveTopics = function(topics){
  for (var i = 0; i < topics.length; i++) {
    var topic = topics[i];
    if (!_topicHash[topic.id]) {
      _topics.push(topic);
      _topicHash[topic.id] = true;
    }
  }
};

TopicStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case TopicConstants.RECEIVE_TOPICS:
      receiveTopics(payload.topics);
      TopicStore.__emitChange();
      break;
    case TopicConstants.RECEIVE_QUESTION_TOPICS:
      _questionTopics = payload.topics;
      TopicStore.__emitChange();
      break;
    case TopicConstants.RECEIVE_QUESTION_TOPIC:
      _questionTopics.push(payload.topic);
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
