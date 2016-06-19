var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var QuestionConstants = require("../constants/QuestionConstants");

var _questions = [];
var QuestionStore = new Store(AppDispatcher);
var newestQuestion = null;

var addQuestion = function(question){
  _questions.unshift(question);
};

QuestionStore.all = function(){
  return JSON.parse(JSON.stringify(_questions));
};

QuestionStore.find = function(id){
  var intId = parseInt(id);
  for (var i = 0; i < _questions.length; i++) {
    var question = _questions[i];
    if (question.id === intId){
      return question;
    }
  }
  return null;
};

var deleteQuestion = function(questionId){
  var questions = [];
  for (var i = 0; i < _questions.length; i++) {
    var question = _questions[i];
    if (question.id !== questionId) {
      questions.push(question);
    }
  }
  _questions = questions;
};

QuestionStore.getNewestQuestion = function(){
  return newestQuestion;
};

QuestionStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case QuestionConstants.RECEIVE_QUESTIONS:
      _questions = payload.questions;
      newestQuestion = null;
      QuestionStore.__emitChange();
      break;

    case QuestionConstants.RECEIVE_QUESTION:
      addQuestion(payload.question);
      newestQuestion = payload.question;
      QuestionStore.__emitChange();
      break;

    case QuestionConstants.REMOVE_QUESTION:
      deleteQuestion(payload.question.id);
      newestQuestion = null;
      QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
