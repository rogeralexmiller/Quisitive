var React = require("react");
var CommentIndex = require("./CommentIndex");
var TimeStamp = require("./TimeStamp");

var QuestionsIndexItem = React.createClass({

  render: function(){
    var questionUrl="#/questions/"+this.props.question.id;
    return(
      <div className="questions-index-item group">
      <TimeStamp time={this.props.question.created_at}/>

        <a href={questionUrl} className="question-body">
          {this.props.question.body}
        </a>
        <p className="question-author">
          {this.props.question.author}
        </p>

        <CommentIndex commentCount={this.props.question.commentCount} commentableType="Question" commentableId={this.props.question.id}/>
      </div>
    );
  }
});

module.exports = QuestionsIndexItem;
