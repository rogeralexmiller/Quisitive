var React = require("react");
var QuestionStore = require("../stores/questionStore");
var QuestionApiUtil = require("../util/questionApiUtil");
var QuestionsIndexItem = require("./QuestionsIndexItem");
var SessionStore = require("../stores/sessionStore");

var QuestionsIndex = React.createClass({
  getInitialState: function(){
    return {questions: []};
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _onChange: function(){
    if (!SessionStore.isUserLoggedIn()){
      this.context.router.push("/login")
    } else{
      this.setState({questions: QuestionStore.all()});
    }
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

  render: function(){
    return(
      <div>
        <div className="questions-index">
          <h3 className="index-header">Most Recent Questions</h3>
          {this.state.questions.map(function(question){
            return <QuestionsIndexItem question={question} key={question.id}/>;
          })}
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = QuestionsIndex;
