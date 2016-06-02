var React = require("React");

var QuestionsIndexItem = React.createClass({

  render: function(){
    var questionUrl="#/questions/"+this.props.question.id;
    return(
      <div className="question-index-item">
        <a href={questionUrl} className="question-body">
          {this.props.question.body}
        </a>
        <p className="question-author"> Asker: {this.props.question.author} </p>
      </div>
    );
  }
});

module.exports = QuestionsIndexItem;
