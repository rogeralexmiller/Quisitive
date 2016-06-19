var React = require("react");
var QuestionStore = require("../stores/questionStore");
var QuestionApiUtil = require("../util/questionApiUtil");
var AnswerIndex = require("./AnswerIndex");
var SessionStore = require("../stores/sessionStore");
var QuestionTopics = require("./QuestionTopics");
var Link = require("react-router").Link;

var CommentIndex = require("./CommentIndex");

var QuestionShow = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    var potentialQuestion = QuestionStore.find(this.props.params.questionId);
    var question = potentialQuestion ? potentialQuestion : {};
    return {question: question, editing: false, answering: false};
  },

  showComments: function(){
    var commentState = !this.state.showComments;
    this.setState({showComments: commentState, answering:false});
  },

  componentWillReceiveProps: function(e){
    debugger;
    QuestionApiUtil.getQuestion(this.props.params.questionId);
  },

  handleBodyChange: function(e){
    var question = this.state.question;
    question.body = e.target.value;
    this.setState({question: question});
  },

  _onChange: function(){
    var potentialQuestion = QuestionStore.find(this.props.params.questionId);
    var question = potentialQuestion ? potentialQuestion : {};

    this.setState({question: question});
  },

  componentDidMount: function(){
    this.listener = QuestionStore.addListener(this._onChange);
    QuestionApiUtil.getQuestion(this.props.params.questionId);
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  handleUpdate: function(e){
    e.preventDefault();
    var questionData = {
      id: this.state.question.id,
      author_id: this.state.question.author_id,
      body: this.state.question.body
    };
    QuestionApiUtil.updateQuestion(questionData);
    this.setState({editing:false});
  },

  handleEdit: function(){
    this.setState({editing:true, answering: false});
  },

  handleCancel: function(e){
    e.preventDefault();
    this.setState({editing:false});
  },

  handleDelete: function(){
    QuestionApiUtil.deleteQuestion(this.state.question.id)
    this.context.router.push("/questions");
  },

  ownerButtons:  function(){
    if (SessionStore.currentUserOwns(this.state.question)) {
      return (
        <div>
          <button onClick={this.handleEdit} className="answer-button">Edit</button>
          <button onClick={this.handleDelete} className="submit-button delete">Delete</button>
        </div>
      )} else{
      return(<div> </div>);
    }
  },

  render: function(){
    var editClass = this.state.editing ? "question-edit-form group" : "hidden";
    var questionClass = this.state.editing ? "hidden" : "show-header group";
    return(
      <div className="question-show">
        <QuestionTopics questionId={this.state.question.id} questionAuthor={this.state.question.author_id}/>
        <form className={editClass}>
          <input type="text" className="question-edit-input" onChange={this.handleBodyChange} value={this.state.question.body}/>
          <button onClick={this.handleUpdate} className="submit-button good-button"> Update </button>
          <a className="edit-cancel" onClick={this.handleCancel} href="#">Cancel</a>
        </form>

        <div className={questionClass}>

          <p>
            {this.state.question.body}
          </p>

          {this.ownerButtons()}
        </div>
        <CommentIndex commentableType="Question" commentableId={this.state.question.id}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = QuestionShow;
