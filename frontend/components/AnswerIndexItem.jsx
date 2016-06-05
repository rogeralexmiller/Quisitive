var React = require("react");

var AnswerIndexItem = React.createClass({
  render: function(){
    return (
      <div className = "answer-index-item">
      <h3 className="answer-author">{this.props.answer.author}</h3>
      <p className="answer-content">{this.props.answer.body}</p>
      </div>
    );
  }
});

module.exports = AnswerIndexItem;
