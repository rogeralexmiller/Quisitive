var React = require("react");
var AnswerStore = require("../stores/questionStore");
var AnswerApiUtil = require("../util/answerApiUtil");

var AnswerIndex = React.createClass({
  getInitialState: function(){
    var answers = AnswerStore.all();
    return {answers: answers};
  },

  onChange: function(){
    this.setState({answers: AnswerStore.all()});
  },

  componentWillReceiveProps: function(){
    AnswerApiUtil.fetchAllAnswers(this.props.params.questionId);
  },

  componentWillMount: function(){
    this.listener = AnswerStore.addListener(this.onChange);
    AnswerApiUtil.fetchAllAnswers(this.props.params.questionId);
  },

  componentWillUnMount: function(){
    this.listener.remove();
  },

  render: function(){
    return(
      <ul>
      </ul>
    );
  }

});

module.exports = AnswerIndex;
