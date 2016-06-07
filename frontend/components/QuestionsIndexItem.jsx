var React = require("react");
var CommentIndex = require("./CommentIndex");
var CommentStore = require("../stores/commentStore");
var CommentApiUtil = require("../util/commentApiUtil");

var QuestionsIndexItem = React.createClass({
  getInitialState: function(){
    return {showComments: false};
  },

  showComments: function(){
    var commentState = !this.state.showComments;
    this.setState({showComments: commentState});
  },

  render: function(){
    var questionUrl="#/questions/"+this.props.question.id;
    var count = this.props.question.commentCount;
    var commentText = "Comments "+count;
    var commentClass = this.state.showComments ? "comment-index" : "hidden";

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
