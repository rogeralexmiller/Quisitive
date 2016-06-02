var React = require("React");
var QuestionStore = require("../stores/questionStore");
var QuestionApiUtil = require("../util/questionApiUtil");
var QuestionsIndexItem = require("./QuestionsIndexItem");

var QuestionsIndex = React.createClass({
  getInitialState: function(){
    return {questions: {}};
  },

  _onChange: function(){
    this.setState({questions: QuestionStore.all()});
  },

  componentDidMount: function(){
    this.listener = QuestionStore.addListener(this._onChange);
    QuestionApiUtil.fetchAllQuestions();
  },

  questionArray: function() {
    var questionArr = [];
    var keys = Object.keys(this.state.questions);
    for (var i = 0; i < keys.length; i++) {
      questionArr.push(this.state.questions[keys[i]]);
    }
    return questionArr;
  },

  render: function(){
    var questionArr = this.questionArray();
    return(
      <div className="questions-index">
        {questionArr.map(function(question){
          return <QuestionsIndexItem question={question} key={question.id}/>;
        })}
      </div>
    );
  }
});

module.exports = QuestionsIndex;
