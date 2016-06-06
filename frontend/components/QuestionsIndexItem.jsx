var React = require("react");

var QuestionsIndexItem = React.createClass({

  render: function(){
    var questionUrl="#/questions/"+this.props.question.id;
    return(
      <div className="questions-index-item">
        <a href={questionUrl} className="question-body">
          {this.props.question.body}
        </a>
        <p className="question-author">
          {this.props.question.author}
        </p>
      </div>
    );
  }
});

module.exports = QuestionsIndexItem;
