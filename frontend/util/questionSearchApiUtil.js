var QuestionSearchActions = require("../actions/questionSearchActions");

var QuestionSearchApiUtil = {
  searchQuestions: function(query){
    $.ajax({
      url: "api/questions/search",
      type: "GET",
      data: {query:query},
      success: function(questions){
        QuestionSearchActions.receiveResults(questions);
      }
    });
  }
};

module.exports = QuestionSearchApiUtil;
