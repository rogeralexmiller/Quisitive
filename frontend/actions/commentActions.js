var AppDispatcher = require("../dispatcher/dispatcher");
var CommentConstants = require("../constants/CommentConstants");

var commentActions = {
  receiveComments: function(comments, commentableType, commentableId){
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENTS,
      comments: comments,
      commentableId: commentableId,
      commentableType: commentableType
    });
  },

  receiveComment: function(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENT,
      comment: comment
    });
  },

  removeComment: function(commentId, commentableType, commentableId){
    AppDispatcher.dispatch({
      actionType: CommentConstants.REMOVE_COMMENT,
      commentId: commentId,
      commentableId: commentableId,
      commentableType: commentableType
    });
  }
};

module.exports = commentActions;
