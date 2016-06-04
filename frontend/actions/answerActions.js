var AppDispatcher = require("../dispatcher/dispatcher");
var AnswerConstants = require("../constants/AnswerConstants");

var AnswerActions = {
  receiveAnswers: function(answers, questionId){
    AppDispatcher.dispatch({
      actionType: AnswerConstants.RECEIVE_ANSWERS,
      answers: answers,
      questionId: questionId
    });
  },

  receiveAnswer: function(answer){
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
