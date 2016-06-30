var TopicActions = require("../actions/topicActions");

var TopicApiUtil = {
  fetchAllTopics: function(){
    $.ajax({
      url: "api/topics",
      type: "GET",
      success: function(topics){
        TopicActions.receiveTopics(topics);
      }
    });
  },

  fetchFollowedTopics: function(){
    $.ajax({
      url: "api/topics/followed_topics",
      type: "GET",
      success: function(topics){
        TopicActions.receiveTopics(topics);
      }
    });
  },

  fetchQuestionTopics: function(questionId){
    $.ajax({
      url: "api/topics/question_topics",
      type: "GET",
      data: {question_id: questionId},
      success: function(topics){
        TopicActions.receiveTopics(topics);
      }
    });
  },

  updateQuestionTopics: function(questionId, topics){
    $.ajax({
      url: "api/topics/update_question_topics",
      type: "PATCH",
      data: {
        question_id: questionId,
        topics: topics
      },
      success: function(topics){
        TopicActions.receiveTopics(topics);
      }
    });
  },

  getTopic: function(topicId){
    $.ajax({
      url: "api/topics/"+topicId,
      type: "GET",
      success: function(topic){
        TopicActions.receiveTopic(topic);
      }
    });
  },

  createQuestionTopic: function(topic){
    $.ajax({
      url: "api/topics",
      type: "POST",
      data: {topic: topic, question_id: questionId},
      success: function(topic){
        TopicActions.receiveTopic(topic);
      }
    });
  },

  updateTopic: function(topic){
    var topicData = {name: topic.name};
    $.ajax({
      url: "api/topics/"+topic.id,
      type: "PATCH",
      data: {topic: topicData},
      success: function(topic){
        TopicActions.receiveTopic(topic);
      }
    });
  },

  deleteTopic: function(topicId){
    $.ajax({
      url: "api/topics/"+topicId,
      type: "DELETE",
      success: function(topic){
        TopicActions.removeTopic(topic);
      }
    });
  }
};

module.exports = TopicApiUtil;
