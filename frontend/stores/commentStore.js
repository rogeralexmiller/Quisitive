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
    return JSON.parse(JSON.stringify(requestedComments));
  } else{
    return [];
  }
};

CommentStore.count = function(type, id){
  var potentialComments = _comments[type][id];
  if (potentialComments) {
    return potentialComments.length;
  } else{
    return 0;
  }
};

var addComment = function(comment){
  commentableId = comment.commentable_id;
  commentableType = comment.commentable_type;
  _comments[commentableType][commentableId].unshift(comment);
};

var deleteComment = function(type, commentableId, commentId){
  var comments = [];
  var oldComments = _comments[commentableType][commentableId];
  for (var i = 0; i < oldComments.length; i++) {
    var comment = oldComments[i];
    if (comment.id !== commentId) {
      comments.push(comment);
    }
  }
  _comments[commentableType][commentableId] = comments;
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
      addComment(payload.comment);
      CommentStore.__emitChange();
      break;
    case CommentConstants.REMOVE_COMMENT:
      commentableId = payload.commentableId;
      commentableType = payload.commentableType;
      deleteComment(commentableType, commentableId, payload.commentId);
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;
