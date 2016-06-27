var React = require("react");
var CommentStore = require("../stores/commentStore");
var CommentApiUtil = require("../util/commentApiUtil");
var CommentIndexItem = require("./CommentIndexItem");
var SessionStore = require("../stores/sessionStore");

var CommentIndex = React.createClass({
  getInitialState: function(){
    var potentialType = this.props.commentableType;
    var potentialId = this.props.commentableId;
    var type = potentialType ? potentialType : "";
    var id = potentialId ? potentialId : "";
    return {comments: [], commentForm: "", count: this.props.commentCount, showComments: false, type: type, id: id};
  },

  onChange: function(){
    var potentialType = this.props.commentableType;
    var potentialId = this.props.commentableId;
    var type = potentialType ? potentialType : "";
    var id = potentialId ? potentialId : "";
    var potentialComments = CommentStore.all(type, id);
    var comments = potentialComments ? potentialComments : [];
    var count = potentialComments ? comments.length : this.props.commentCount;
    this.setState({comments: comments, count: count});
  },

  componentDidMount: function(){
    this.listener = CommentStore.addListener(this.onChange);
  },

  componentWillReceiveProps: function(e){
    var type = e.commentableType;
    var id = e.commentableId;
    var potentialComments = CommentStore.all(type, id);
    var comments = potentialComments ? potentialComments : [];
    var count = this.props.commentCount;
    this.setState({type: type, id: id, comments: comments, count: count});
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  textChange: function(e){
    this.setState({commentForm:e.target.value});
  },

  submitComment: function(e){
    e.preventDefault();
    var comment = {
                  body: this.state.commentForm,
                  commentableType: this.props.commentableType,
                  commentableId: this.props.commentableId
    };
    CommentApiUtil.createComment(comment);
    this.setState({commentForm: ""});
  },

  showComments: function(){
    CommentApiUtil.fetchAllComments(this.state.type, this.state.id);
    var commentState = !this.state.showComments;
    this.setState({showComments: commentState});
  },

  render: function(){
    var count = this.state.count ? this.state.count : this.props.commentCount;
    var countText = "Comments " + count;
    var commentClass = this.state.showComments ? "comment-index" : "hidden";

    return(
      <div  className="group comment-index-group">
        <p className="cancelAnswer comment-count" onClick={this.showComments}>{countText}</p>
        <div className={commentClass}>
          <form className="comment-form group" onSubmit={this.submitComment}>
          <input type="submit" className="submit-button comment-submit" value="Comment"/>
            <textarea onChange={this.textChange}
                      placeholder="Add a comment..."
                      value={this.state.commentForm}></textarea>
          </form>
          {this.state.comments.map(function(comment, idx){
            return <CommentIndexItem key={idx} comment={comment}/>;
          })}
        </div>
      </div>
    );
  }
});

module.exports = CommentIndex;
