var React = require("react");
var CommentStore = require("../stores/commentStore");
var CommentApiUtil = require("../util/commentApiUtil");

var CommentIndex = React.createClass({
  getInitialState: function(){
    var potentialComments = CommentStore.all(this.props.commentableType, this.props.commentableId);
    var comments = potentialComments ? potentialComments : {};
    return {comments: comments};
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

  render: function(){
    var commentArr = this.commentArray();
    return(
      <ul>
        {commentArr.map(function(comment, idx){
          return <li key={idx}> {comment.body} </li>;
        })}
      </ul>
    );
  }
});

module.exports = CommentIndex;
