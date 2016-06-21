var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var CommentConstants = require("../constants/CommentConstants");

var CommentStore = new Store(AppDispatcher);
var _comments = {Question: {}, Answer: {}};

var commentableId;
var commentableType;

CommentStore.all = function(type, commentableId){
  var requestedComments = _comments[type][commentableId];
  if (requestedComments) {
    return requestedComments.slice(0);
  } else{
    return [];
  }
};

CommentStore.count = function(type, id){
  var potentialComments = _comments[type][id];
  if (potentialComments) {
    return potentialComments.length;
  } else {
    return 0;
  }
};

var addComment = function(comment){
  var commentableId = comment.commentable_id;
  var commentableType = comment.commentable_type;
  _comments[commentableType][commentableId].unshift(comment);
};

var updateComment = function(comment){
  var commentableId = comment.commentable_id;
  var commentableType = comment.commentable_type;
  deleteComment(comment);
  _comments[commentableType][commentableId].unshift(comment);
};

var deleteComment = function(comment){
  var comments = [];
  var type = comment.commentable_type;
  var id = comment.commentable_id;

  var oldComments = _comments[type][id];

  for (var i = 0; i < oldComments.length; i++) {
    var oldComment = oldComments[i];
    if (oldComment.id !== comment.id) {
      comments.push(oldComment);
    }
  }
  _comments[type][id] = comments;
};

CommentStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case CommentConstants.RECEIVE_COMMENTS:
      commentableId = payload.commentableId;
      commentableType = payload.commentableType;
      _comments[commentableType][commentableId] = payload.comments;
      CommentStore.__emitChange();
      break;
    case CommentConstants.RECEIVE_COMMENT:
      var comment = payload.comment;
      commentableId = comment.commentableId;
      commentableType = comment.commentableType;
      addComment(comment);
      CommentStore.__emitChange();
      break;
    case CommentConstants.UPDATE_COMMENT:
      var comment = payload.comment;
      commentableId = comment.commentableId;
      commentableType = comment.commentableType;
      updateComment(comment);
      CommentStore.__emitChange();
      break;
    case CommentConstants.REMOVE_COMMENT:
      deleteComment(payload.comment);
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;
