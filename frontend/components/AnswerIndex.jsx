var React = require("react");
var AnswerStore = require("../stores/answerStore");
var AnswerApiUtil = require("../util/answerApiUtil");
var AnswerIndexItem = require("./AnswerIndexItem");

var AnswerIndex = React.createClass({

  getInitialState: function(){
    var answers = AnswerStore.all(this.props.params.questionId);
    return {answers: answers, answering: false, answer: ""};
  },

  onChange: function(){
    this.setState({answers: AnswerStore.all(this.props.params.questionId)});
  },

  componentDidMount: function(){
    this.listener = AnswerStore.addListener(this.onChange);
    AnswerApiUtil.fetchAllAnswers(this.props.params.questionId);
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  componentWillReceiveProps: function(){
    AnswerApiUtil.fetchAllAnswers(this.props.params.questionId);
  },

  answerArray: function() {
    var answerArr = [];
    var keys = Object.keys(this.state.answers);
    for (var i = 0; i < keys.length; i++) {
      answerArr.push(this.state.answers[keys[i]]);
    }
    return answerArr;
  },

  showAnswer: function(){
    this.setState({answering: true})
  },

  submitAnswer: function(e){
    e.preventDefault();
    AnswerApiUtil.createAnswer({
      body: this.state.answer,
      question_id: this.props.params.questionId
    });

    this.setState({answer: "", answering: false});
  },

  textChange: function(e){
    this.setState({answer: e.target.value})
  },

  cancelAnswer: function(){
    this.setState({answering: false})
  },

  render: function(){
    var answers = this.answerArray();
    var answerCount = answers.length + " Answers";
    var answerFormClass = this.state.answering ? "answer-form" : "hidden";
    var answerButtonClass = this.state.answering ? "hidden" : "answer-button";

    return(
      <div className="answer-index group">
        <button onClick={this.showAnswer} className={answerButtonClass}> Answer </button>

        <form className={answerFormClass}>
          <textarea rows="3" className="answer-input" onChange={this.textChange} value={this.state.answer}></textarea>

          <input type="submit" className="answer-button" onClick={this.submitAnswer}/>
          <p className="cancelAnswer" onClick={this.cancelAnswer}>Cancel</p>
        </form>

        <h3 className="answer-count">{answerCount}</h3>
        <ul className="answer-feed"> {answers.map(function(answer, idx){
          return (
            <AnswerIndexItem key={idx} answer={answer}/>
          )
        })}
        </ul>
      </div>
    );
  }

});

module.exports = AnswerIndex;
