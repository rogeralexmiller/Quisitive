var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AnswerConstants = require("../constants/AnswerConstants");

var AnswerStore = new Store(AppDispatcher);
var answers = {};

var currentQuestionId = null;

AnswerStore.all = function(questionId){
  if (questionId === currentQuestionId) {
    return JSON.parse(JSON.stringify(answers));
  } else{
    return {};
  }
};

AnswerStore.currentQuestionId = function(){
  return currentQuestionId;
};

var addAnswer = function(answer){
  answers[answer.id] = answer;
};

AnswerStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case AnswerConstants.RECEIVE_ANSWERS:
      answers = payload.answers;
      currentQuestionId = payload.questionId;
      AnswerStore.__emitChange();
      break;
    case AnswerConstants.RECEIVE_ANSWER:
      answers[payload.answer.id] = payload.answer;
      AnswerStore.__emitChange();
      break;
    case AnswerConstants.REMOVE_ANSWER:
      delete answers[payload.answer.id];
      currentQuestionId = payload.answer.questionId;
      AnswerStore.__emitChange();
      break;
  }
};

module.exports = AnswerStore;
