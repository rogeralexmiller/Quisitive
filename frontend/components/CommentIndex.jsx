var React = require("react");
var CommentStore = require("../stores/commentStore");
var CommentApiUtil = require("../util/commentApiUtil");
var CommentIndexItem = require("./CommentIndexItem");
var SessionStore = require("../stores/sessionStore");

var CommentIndex = React.createClass({
  getInitialState: function(){
    var potentialComments = CommentStore.all(this.props.commentableType, this.props.commentableId);
    var comments = potentialComments ? potentialComments : {};
    return {comments: comments, commentForm: ""};
  },

  onChange: function(){
    var potentialComments = CommentStore.all(this.props.commentableType, this.props.commentableId);
    var comments = potentialComments ? potentialComments : {};
    this.setState({comments: comments});
  },

  componentDidMount: function(){
    this.listener = CommentStore.addListener(this.onChange);
    var type = this.props.commentableType;
    var id = this.props.commentableId;
    CommentApiUtil.fetchAllComments(type, id);
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

  render: function(){
    var commentArr = this.commentArray();
    return(
      <div>
        <form className="comment-form group" onSubmit={this.submitComment}>
          <textarea onChange={this.textChange}
                    placeholder="Add a comment..."
                    type="text"
                    value={this.state.commentForm}></textarea>
          <input type="submit" className="submit-button" value="Submit"/>
        </form>
        {commentArr.map(function(comment, idx){
          return <CommentIndexItem key={idx} comment={comment}/>;
        })}
      </div>
    );
  }
});

module.exports = CommentIndex;
