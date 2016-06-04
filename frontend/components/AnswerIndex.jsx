var React = require("react");
var AnswerStore = require("../stores/answerStore");
var AnswerApiUtil = require("../util/answerApiUtil");

var AnswerIndex = React.createClass({

  getInitialState: function(){
    var answers = AnswerStore.all(this.props.params.questionId);
    return {answers: answers};
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

  render: function(){
    var answers = this.answerArray();
    return(
      <ul className="answer-index"> {answers.map(function(answer, idx){
        return (
          <li className="answer-index-item" key={idx}>
            <strong> {answer.author} </strong>
            <p>
              {answer.body}
            </p>
          </li>
        )
      })}
      </ul>
    );
  }

});

module.exports = AnswerIndex;
