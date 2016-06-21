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

  updateComment: function(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.UPDATE_COMMENT,
      comment: comment
    });
  },

  removeComment: function(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.REMOVE_COMMENT,
      comment: comment
    });
  }
};

module.exports = commentActions;
