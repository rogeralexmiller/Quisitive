var CommentActions = require("../actions/commentActions");

var CommentApiUtil = {
  fetchAllComments: function(commentableType, commentableId){
    $.ajax({
      url: "api/" + commentableType + "s/" + commentableId + "/comments",
      type: "GET",
      data: {commentableType: commentableType, commentableId: commentableId},
      success: function(comments){
        CommentActions.receiveComments(comments, commentableType, commentableId);
      }
    });
  },

  getComment: function(commentId){
    $.ajax({
      url: "api/comments/"+commentId,
      type: "GET",
      success: function(comment){
        CommentActions.receiveComment(comment, comment.commentable_type, comment.commentable_id);
      }
    });
  },

  createComment: function(comment){
    var commentData = {
      body: comment.body,
      commentable_type: comment.commentableType,
      commentable_id: comment.commentableId
    };
    $.ajax({
      url: "api/" + comment.commentableType + "s/" + comment.commentableId + "/comments",
      type: "POST",
      data: {comment: commentData},
      success: function(comment){
        CommentActions.receiveComment(comment);
      }
    });
  },

  updateComment: function(comment){
    var commentData = {body: comment.body};
    $.ajax({
      url: "api/comments/"+comment.id,
      type: "PATCH",
      data: {comment: commentData},
      success: function(comment){
        CommentActions.receiveComment(comment, comment.commentable_type, commentable_id);
      }
    });
  },

  deleteComment: function(commentId){
    $.ajax({
      url: "api/comments/"+commentId,
      type: "DELETE",
      success: function(comment){
        CommentActions.removeComment(comment, comment.commentable_type, comment.commentable_id);
      }
    });
  }
};

module.exports = CommentApiUtil;
