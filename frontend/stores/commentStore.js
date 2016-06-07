var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var CommentConstants = require("../constants/CommentConstants");

var CommentStore = new Store(AppDispatcher);
var comments = {question: {}, answer: {}};

var commentableId;
var commentableType;

CommentStore.comments = function(){
  return comments;
};

CommentStore.all = function(type, commentableId){
  var requestedComments = comments[type][commentableId];
  if (requestedComments) {
    return JSON.parse(JSON.stringify(requestedComments));
  } else{
    return {};
  }
};

CommentStore.count = function(type, id){
  var potentialComments = comments[type][id];
  if (potentialComments) {
    return Object.keys(potentialComments).length;
  } else{
    return 0;
  }
};

var addComment = function(comment){
  commentableId = comment.commentable_id;
  commentableType = comment.commentable_type;

  comments[commentableType][commentableId][comment.id] = comment;
};

CommentStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case CommentConstants.RECEIVE_COMMENTS:
      commentableId = payload.commentableId;
      commentableType = payload.commentableType;
      comments[commentableType][commentableId] = payload.comments;
      CommentStore.__emitChange();
      break;
    case CommentConstants.RECEIVE_COMMENT:
      addComment(payload.comment);
      CommentStore.__emitChange();
      break;
    case CommentConstants.REMOVE_COMMENT:
      commentableId = payload.commentableId;
      commentableType = payload.commentableType;
      delete comments[commentableId][commentableType][payload.commentId];
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;
