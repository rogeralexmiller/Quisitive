var React = require("react");
var CommentApiUtil = require("../util/commentApiUtil");
var SessionStore = require("../stores/sessionStore");

var CommentIndexItem = React.createClass({

  getInitialState: function(){
    return {editing: false, editForm: this.props.comment.body};
  },

  componentWillReceiveProps: function(e){
    var comment = e.comment;
    this.setState({editForm: comment.body});
  },


  ownerButtons: function(){
    if (SessionStore.currentUserOwns(this.props.comment)) {
      return (
        <div>
          <button className="submit-button edit-comment" onClick={this.showEdit}>Edit</button>
          <button className="delete delete-comment" onClick={this.deleteComment}>Delete</button>
        </div>
      )} else{
      return(<div> </div>);
    }
  },

  updateComment: function(e){
    e.preventDefault();
    CommentApiUtil.updateComment({body:this.state.editForm, id: this.props.comment.id});
    this.setState({editing:false})
  },

  textChange: function(e){
    this.setState({editForm: e.target.value});
  },

  showEdit: function(){
    this.setState({editing: true});
  },

  deleteComment: function(){
    CommentApiUtil.deleteComment(this.props.comment.id);
  },

  handleCancel: function(e){
    e.preventDefault();
    this.setState({editing:false});
  },

  render: function(){
    var editClass = this.state.editing ? "comment-form edit group" : "hidden";
    var commentClass = this.state.editing ? "hidden" : "comment group";

    return(
      <div className="comment-index-item group">
        <p className="answer-author"> {this.props.comment.author} </p>

        <form className={editClass} onSubmit={this.updateComment}>
          <textarea className="edit-comment-input" onChange={this.textChange}
                    placeholder="Add a comment..."
                    value={this.state.editForm}></textarea>
          <input type="submit" value="Update" className="submit-button"/>
          <a className="cancel-answer" onClick={this.handleCancel} href="#">Cancel</a>
        </form>
        <div className={commentClass}>
          <p className="comment-body"> {this.props.comment.body} </p>
          {this.ownerButtons()}
        </div>
      </div>
    );
  }
});

module.exports = CommentIndexItem;
