var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var CommentConstants = require("../constants/CommentConstants");

var CommentStore = new Store(AppDispatcher);
var comments = {};

var commentableId = null;
var commentableType = null;

CommentStore.all = function(id, type){
  if (commentableId === id && commentableType === type) {
    return JSON.parse(JSON.stringify(comments));
  } else {
    return {};
  }
};

CommentStore.commentableId = function(){
  return commentableId;
};

CommentStore.commentableType = function(){
  return commentableType;
};

var addComment = function(comment){
  comments[comment.id] = comment;
};

CommentStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case CommentConstants.RECEIVE_COMMENTS:
      comments = payload.comments;
      commentableId = payload.commentableId;
      commentableType = payload.commentableType;
      CommentStore.__emitChange();
      break;
    case CommentConstants.RECEIVE_COMMENT:
      comments[payload.comment.id] = payload.comment;
      CommentStore.__emitChange();
      break;
    case CommentConstants.REMOVE_COMMENT:
      delete comments[payload.comment.id];
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;
