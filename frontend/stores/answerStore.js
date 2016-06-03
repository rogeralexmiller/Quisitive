var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AnswerConstants = require("../constants/AnswerConstants");

var AnswerStore = new Store(AppDispatcher);
var answers = {};

AnswerStore.all = function(){
  return JSON.parse(JSON.stringify(answers));
};

var addAnswer = function(answer){
  answer[answer.id] = answer;
};

AnswerStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case AnswerConstants.RECEIVE_ANSWERS:
      answers = payload.answers;
      AnswerStore.__emitChange();
      break;

    case AnswerConstants.RECEIVE_ANSWER:
      addAnswer(payload.answer);
      AnswerStore.__emitChange();
      break;

    case AnswerConstants.REMOVE_ANSWER:
      delete answers[payload.answer.id];
      AnswerStore.__emitChange();
      break;
  }
};

module.exports = AnswerStore;
