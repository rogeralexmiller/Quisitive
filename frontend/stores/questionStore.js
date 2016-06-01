var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var QuestionConstants = require("../constants/QuestionConstants");

var _questions = {};
var QuestionStore = new Store(AppDispatcher);

var addQuestion = function(question){
  _questions[question.id] = question;
};

QuestionStore.all = function(){
  return JSON.parse(JSON.stringify(_questions));
};

QuestionStore.find = function(id){
  return _questions[id];
};

QuestionStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case QuestionConstants.RECEIVE_QUESTIONS:
      _questions = payload.questions;
      QuestionStore.__emitChange();
      break;

    case QuestionConstants.RECEIVE_QUESTION:
      addQuestion(payload.question);
      QuestionStore.__emitChange();
      break;

    case QuestionConstants.REMOVE_QUESTION:
      delete _questions[payload.question.id];
      QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
