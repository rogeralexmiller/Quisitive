var AppDispatcher = require("../dispatcher/dispatcher");
var AnswerConstants = require("../constants/AnswerConstants");

var AnswerActions = {
  receiveAnswers: function(answers){
    AppDispatcher.dispatch({
      actionType: AnswerConstants.RECEIVE_ANSWER,
      answers: answers
    });
  },

  receiveAnswer: function(question){
    AppDispatcher.dispatch({
      actionType: AnswerConstants.RECEIVE_ANSWER,
      answer: answer
    });
  },

  removeAnswer: function(answer){
    AppDispatcher.dispatch({
      actionType: AnswerConstants.REMOVE_ANSWER,
      answer: answer
    });
  }
};

module.exports = AnswerActions;
