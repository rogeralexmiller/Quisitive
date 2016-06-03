var React = require("react");
var QuestionStore = require("../stores/questionStore");
var QuestionApiUtil = require("../util/questionApiUtil");
var QuestionsIndexItem = require("./QuestionsIndexItem");
var SessionStore = require("../stores/sessionStore");
var HeaderNav = require("./HeaderNav");

var QuestionsIndex = React.createClass({
  getInitialState: function(){
    return {questions: {}};
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _onChange: function(){
    if (!SessionStore.isUserLoggedIn()){
      this.context.router.push("/login")
    }
    this.setState({questions: QuestionStore.all()});
  },

  componentDidMount: function(){
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.questionListener = QuestionStore.addListener(this._onChange);
    QuestionApiUtil.fetchAllQuestions();
  },

  componentWillUnmount: function(){
    this.sessionListener.remove();
    this.questionListener.remove();
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
      <div>
        <HeaderNav/>
        <div className="questions-index">
          <h3 className="questions-index-header">Most Recent Questions</h3>
          {questionArr.map(function(question){
            return <QuestionsIndexItem question={question} key={question.id}/>;
          })}
        </div>
      </div>
    );
  }
});

module.exports = QuestionsIndex;
