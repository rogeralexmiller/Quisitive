var React = require("react");
var QuestionStore = require("../stores/questionStore");
var QuestionApiUtil = require("../util/questionApiUtil");
var HeaderNav = require("./HeaderNav");
var QuestionEdit = require("./QuestionEdit");

var QuestionShow = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    var potentialQuestion = QuestionStore.find(this.props.params.questionId);
    var question = potentialQuestion ? potentialQuestion : {};
    return {question: question, editing: false};
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
    this.setState({editing:true});
  },

  handleCancel: function(e){
    e.preventDefault();
    this.setState({editing:false});
  },

  render: function(){
    var editClass = this.state.editing ? "question-edit-form group" : "hidden";
    var questionClass = this.state.editing ? "hidden" : "question-header group";

    return(
      <div>
        <HeaderNav/>

        <form className={editClass}>
          <input type="text" className="question-edit-input" onChange={this.handleBodyChange} value={this.state.question.body}/>
          <button onClick={this.handleUpdate} className="good-button"> Update </button>
          <a onClick={this.handleCancel} href="#">Cancel</a>
        </form>

        <div className={questionClass}>

          <p>
            {this.state.question.body}
          </p>

          <button onClick={this.handleEdit} className="good-button">Edit Question</button>
        </div>
      </div>
    );
  }
});

module.exports = QuestionShow;
