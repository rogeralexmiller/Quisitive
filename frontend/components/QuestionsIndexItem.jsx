var React = require("react");
var CommentIndex = require("./CommentIndex");

var QuestionsIndexItem = React.createClass({

  render: function(){
    var questionUrl="#/questions/"+this.props.question.id;
    var count = this.props.question.commentCount;

    return(
      <div className="questions-index-item">
        <a href={questionUrl} className="question-body">
          {this.props.question.body}
        </a>
        <p className="question-author">
          {this.props.question.author}
        </p>

        <CommentIndex commentableType="Question" commentableId={this.props.question.id}/>
      </div>
    );
  }
});

module.exports = QuestionsIndexItem;
