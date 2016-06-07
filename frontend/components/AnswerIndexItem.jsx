var React = require("react");
var AnswerApiUtil = require("../util/answerApiUtil");
var SessionStore = require("../stores/sessionStore");
var CommentIndex = require("./CommentIndex");
var CommentStore = require("../stores/commentStore");
var CommentApiUtil = require("../util/commentApiUtil");

var AnswerIndexItem = React.createClass({

  getInitialState: function(){
    var count = CommentStore.count("answer", this.props.answer.id);
    return {answerEdit: this.props.answer.body,
            editing: false,
            commentCount: count,
            showComments: false};
  },

  onChange: function(){
    var count = CommentStore.count("answer", this.props.answer.id);
    this.setState({commentCount: count});
  },

  componentDidMount: function(){
    this.listener = CommentStore.addListener(this.onChange);
    CommentApiUtil.fetchAllComments("answer", this.props.answer.id);
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  showComments: function(){
    var commentState = !this.state.showComments;
    this.setState({showComments: commentState});
  },

  textChange: function(e){
    this.setState({answerEdit: e.target.value});
  },

  editAnswer: function(){
    this.setState({editing: true});
  },

  deleteAnswer: function(){
    AnswerApiUtil.deleteAnswer(this.props.answer.id);
  },

  updateAnswer: function(){
    AnswerApiUtil.updateAnswer({
      id: this.props.answer.id,
      body: this.state.answerEdit
    })
    this.setState({editing: false})
  },

  cancelEdit: function(){
    this.setState({editing: false})
  },

  ownerButtons:  function(){
    if (SessionStore.currentUserOwns(this.props.answer)) {
      var ButtonGroupClass = this.state.editing ? "hidden" : "user-buttons group";
      return (
        <div className={ButtonGroupClass}>
          <button className="answer-button" onClick={this.editAnswer} > Edit </button>
          <button className="answer-button delete" onClick={this.deleteAnswer} > Delete </button>
        </div>
      )} else{
      return(<div> </div>);
    }
  },


  render: function(){
    var answerFormClass = this.state.editing ? "answer-form" : "hidden";
    var answerShowClass = this.state.editing ? "hidden" : "answer-content";

    var count = this.state.commentCount;
    var commentText = "Comments "+count;
    var commentClass = this.state.showComments ? "comment-index" : "hidden";

    return (
      <div className = "answer-index-item">
      <h3 className="answer-author" >{this.props.answer.author}</h3>
      <p className={answerShowClass} >{this.props.answer.body}</p>

      <form className={answerFormClass}>
        <textarea rows="3" className="answer-input" onChange={this.textChange} value={this.state.answerEdit}></textarea>

        <input type="submit" className="answer-button" value="Update" onClick={this.updateAnswer}/>
        <p className="cancelAnswer" onClick={this.cancelEdit}>Cancel</p>
      </form>

      {this.ownerButtons()}

      <p onClick={this.showComments}>{commentText}</p>
      <div className={commentClass}>
        <CommentIndex commentableType="answer" commentableId={this.props.answer.id}/>
      </div>
      </div>
    );
  }
});

module.exports = AnswerIndexItem;
