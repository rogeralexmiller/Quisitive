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

  getComment: function(commentId, type, id){
    $.ajax({
      url: "api/comments/"+commentId,
      type: "GET",
      success: function(comment){
        CommentActions.receiveComment(comment, type, id);
      }
    });
  },

  createComment: function(comment, commentableType, commentableId){
    $.ajax({
      url: "api/" + commentable_type + "/" + commentableId + "/comments",
      type: "POST",
      data: {comment: comment},
      success: function(comment){
        CommentActions.receiveComment(comment, commentableType, commentableId);
      }
    });
  },

  updateComment: function(comment, type, id){
    var commentData = {body: comment.body};
    $.ajax({
      url: "api/comments/"+comment.id,
      type: "PATCH",
      data: {comment: commentData},
      success: function(comment){
        CommentActions.receiveComment(comment, type, id);
      }
    });
  },

  deleteComment: function(commentId, type, commentableId){
    $.ajax({
      url: "api/comments/"+commentId,
      type: "DELETE",
      success: function(comment){
        CommentActions.removeComment(comment, type, commentableId);
      }
    });
  }
};

module.exports = CommentApiUtil;
