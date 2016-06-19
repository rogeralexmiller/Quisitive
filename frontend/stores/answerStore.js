var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AnswerConstants = require("../constants/AnswerConstants");

var AnswerStore = new Store(AppDispatcher);
var _answers = [];

var currentQuestionId = null;

AnswerStore.all = function(questionId){
  if (questionId === currentQuestionId) {
    return JSON.parse(JSON.stringify(_answers));
  } else {
    return [];
  }
};

AnswerStore.currentQuestionId = function(){
  return currentQuestionId;
};

var addAnswer = function(answer){
  _answers.unshift(answer);
};

var deleteAnswer = function(answerId){
  var answers = [];
  for (var i = 0; i < _answers.length; i++) {
    var answer = _answers[i];
    if (answer.id !== answerId) {
      answers.push(answer);
    }
  }
  _answers = answers;
};

AnswerStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case AnswerConstants.RECEIVE_ANSWERS:
      _answers = payload.answers;
      currentQuestionId = payload.questionId;
      AnswerStore.__emitChange();
      break;
    case AnswerConstants.RECEIVE_ANSWER:
      addAnswer(payload.answer);
      AnswerStore.__emitChange();
      break;
    case AnswerConstants.REMOVE_ANSWER:
      deleteAnswer(payload.answer.id);
      AnswerStore.__emitChange();
      break;
  }
};

module.exports = AnswerStore;
