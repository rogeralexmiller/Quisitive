var React = require("react");

var CommentIndexItem = React.createClass({
  render: function(){
    return(
      <div className="comment-index-item">
        <p className="answer-author"> {this.props.comment.author} </p>
        <p> {this.props.comment.body} </p>
      </div>
    );
  }
});

module.exports = CommentIndexItem;
