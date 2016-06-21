var QuestionActions = require("../actions/questionActions");

var QuestionApiUtil = {
  fetchAllQuestions: function(){
    $.ajax({
      url: "api/questions",
      type: "GET",
      success: function(questions){
        QuestionActions.receiveQuestions(questions);
      }
    });
  },

  getQuestion: function(id){
    $.ajax({
      url: "api/questions/"+id,
      type: "GET",
      success: function(question){
        QuestionActions.receiveQuestion(question);
      }
    });
  },

  createQuestion: function(question, callback){
    $.ajax({
      url: "api/questions/",
      type: "POST",
      data: {question: question},
      success: function(question){
        QuestionActions.receiveQuestion(question);
        callback(question.id);
      }
    });
  },

  updateQuestion: function(question){
    var questionData = {body: question.body};
    $.ajax({
      url: "api/questions/"+question.id,
      type: "PATCH",
      data: {question: questionData},
      success: function(question){
        QuestionActions.receiveQuestion(question);
      }
    });
  },

  deleteQuestion: function(id){
    $.ajax({
      url: "api/questions/"+id,
      type: "DELETE",
      success: function(question){
        QuestionActions.removeQuestion(question);
      }
    });
  }
};

module.exports = QuestionApiUtil;
