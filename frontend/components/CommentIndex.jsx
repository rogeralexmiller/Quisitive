var React = require("react");
var CommentStore = require("../stores/commentStore");
var CommentApiUtil = require("../util/commentApiUtil");
var CommentIndexItem = require("./CommentIndexItem");
var SessionStore = require("../stores/sessionStore");

var CommentIndex = React.createClass({
  getInitialState: function(){
    var potentialComments = CommentStore.all(this.props.commentableType, this.props.commentableId);
    var comments = potentialComments ? potentialComments : {};
    var potentialType = this.props.commentableType;
    var potentialId = this.props.commentableId;
    var type = potentialType ? potentialType : "";
    var id = potentialId ? potentialId : "";
    return {comments: comments, commentForm: "", showComments: false, type: type, id: id};
  },

  onChange: function(){
    var potentialType = this.props.commentableType;
    var potentialId = this.props.commentableId;
    var type = potentialType ? potentialType : "";
    var id = potentialId ? potentialId : "";

    var potentialComments = CommentStore.all(type, id);
    var comments = potentialComments ? potentialComments : {};
    this.setState({comments: comments});
  },

  componentDidMount: function(){
    this.listener = CommentStore.addListener(this.onChange);
    var type = this.props.commentableType;
    var id = this.props.commentableId;
    CommentApiUtil.fetchAllComments(type, id);
  },

  componentWillReceiveProps: function(e){
    var type = e.commentableType;
    var id = e.commentableId;
    if (type && id){
      CommentApiUtil.fetchAllComments(type, id);
    }
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  commentArray: function() {
    var commentArr = [];
    var keys = Object.keys(this.state.comments);
    for (var i = 0; i < keys.length; i++) {
      commentArr.push(this.state.comments[keys[i]]);
    }
    return commentArr;
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
    var commentState = !this.state.showComments;
    this.setState({showComments: commentState});
  },

  render: function(){
    var commentArr = this.commentArray();
    var count = commentArr.length;
    var countText = "Comments " + count;
    var commentClass = this.state.showComments ? "comment-index" : "hidden";

    return(
      <div>
        <p className="cancelAnswer" onClick={this.showComments}>{countText}</p>
        <div className={commentClass}>
          <form className="comment-form group" onSubmit={this.submitComment}>
            <textarea onChange={this.textChange}
                      placeholder="Add a comment..."
                      value={this.state.commentForm}></textarea>
            <input type="submit" className="submit-button" value="Submit"/>
          </form>
          {commentArr.map(function(comment, idx){
            return <CommentIndexItem key={idx} comment={comment}/>;
          })}
        </div>
      </div>
    );
  }
});

module.exports = CommentIndex;
