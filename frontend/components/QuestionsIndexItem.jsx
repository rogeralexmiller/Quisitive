var React = require("react");
var CommentIndex = require("./CommentIndex");
var CommentStore = require("../stores/commentStore");
var CommentApiUtil = require("../util/commentApiUtil");

var QuestionsIndexItem = React.createClass({
  getInitialState: function(){
    var count = CommentStore.count("question", this.props.question.id);
    return {showComments: false, commentCount: count}
  },

  onChange: function(){
    var count = CommentStore.count("question", this.props.question.id);
    this.setState({commentCount: count});
  },

  componentDidMount: function(){
    this.listener = CommentStore.addListener(this.onChange);
    CommentApiUtil.fetchAllComments("question", this.props.question.id);
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  showComments: function(){
    var commentState = !this.state.showComments;
    this.setState({showComments: commentState});
  },

  render: function(){
    var questionUrl="#/questions/"+this.props.question.id;
    var count = this.state.commentCount;
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
        <p onClick={this.showComments}>{commentText}</p>
        <div className={commentClass}>
          <CommentIndex commentableType="question" commentableId={this.props.question.id}/>
        </div>
      </div>
    );
  }
});

module.exports = QuestionsIndexItem;
