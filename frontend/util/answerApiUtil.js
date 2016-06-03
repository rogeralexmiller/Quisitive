var AnswerActions = require("../actions/answerActions");

var AnswerApiUtil = {
  fetchAllAnswers: function(question_id){
    $.ajax({
      url: "api/questions/"+question_id+"/answers",
      type: "GET",
      success: function(answers){
        AnswerActions.receiveAnswers(answers);
      }
    });
  },

  getAnswer: function(id){
    $.ajax({
      url: "api/answers/"+id,
      type: "GET",
      success: function(answer){
        AnswerActions.receiveAnswer(answer);
      }
    });
  },

  createAnswer: function(answer){
    $.ajax({
      url: "api/questions/"+answer.question_id+"/answers",
      type: "POST",
      data: {answer: answer},
      success: function(answer){
        AnswerActions.receiveAnswer(answer);
      }
    });
  },

  updateAnswer: function(answer){
    $.ajax({
      url: "api/answers/"+answer.id,
      type: "PATCH",
      data: {question: answer},
      success: function(answer){
        AnswerActions.receiveAnswer(answer);
      }
    });
  },

  deleteAnswer: function(id){
    $.ajax({
      url: "api/answers/"+id,
      type: "DELETE",
      success: function(answer){
        AnswerActions.removeAnswer(answer);
      }
    });
  }
};

module.exports = AnswerApiUtil;
