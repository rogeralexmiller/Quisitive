var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");

var AnswerStore = new Store(AppDispatcher);
var answers = {};

AnswerStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case AnswerConstants.RECEIVE_ANSWERS:
      answers = payload.answers;
      newestAnswer = null;
      AnswerStore.__emitChange();
      break;

    case AnswerConstants.RECEIVE_ANSWER:
      addAnswer(payload.answer);
      newestAnswer = payload.answer;
      AnswerStore.__emitChange();
      break;

    case AnswerConstants.REMOVE_ANSWER:
      delete answers[payload.answer.id];
      newestAnswer = null;
      AnswerStore.__emitChange();
      break;
  }
};

module.exports = AnswerStore;
