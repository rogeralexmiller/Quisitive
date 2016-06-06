var CommentActions = require("../actions/commentActions");

var CommentApiUtil = {
  fetchAllComments: function(commentableType, commentableId){
    $.ajax({
      url: "api/" + commentableType + "s/" + commentableId + "/comments",
      type: "GET",
      data: {commentableType: commentableType, commentableId: commentableId},
      success: function(comments){
        debugger;
        CommentActions.receiveComments(comments, commentableType, commentableId);
      }
    });
  },

  getComment: function(commentId){
    $.ajax({
      url: "api/comments/"+commentId,
      type: "GET",
      success: function(comment){
        CommentActions.receiveComment(comment);
      }
    });
  },

  createComment: function(comment, commentableType, commentableId){
    $.ajax({
      url: "api/" + commentable_type + "/" + commentableId + "/comments",
      type: "POST",
      data: {comment: comment},
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
        CommentActions.receiveComment(comment);
      }
    });
  },

  deleteComment: function(id){
    $.ajax({
      url: "api/comments/"+id,
      type: "DELETE",
      success: function(comment){
        CommentActions.removeComment(comment);
      }
    });
  }
};

module.exports = CommentApiUtil;
