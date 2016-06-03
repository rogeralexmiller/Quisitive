var AppDispatcher = require("../dispatcher/dispatcher");
var QuestionConstants = require("../constants/QuestionConstants");

var QuestionActions = {
  receiveQuestions: function(questions){
    AppDispatcher.dispatch({
      actionType: QuestionConstants.RECEIVE_QUESTIONS,
      questions: questions
    });
  },

  receiveQuestion: function(question){
    AppDispatcher.dispatch({
      actionType: QuestionConstants.RECEIVE_QUESTION,
      question: question
    });
  },

  removeQuestion: function(question){
    AppDispatcher.dispatch({
      actionType: QuestionConstants.REMOVE_QUESTION,
      question: question
    });
  }
};

module.exports = QuestionActions;
