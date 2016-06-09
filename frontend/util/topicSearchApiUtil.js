var TopicSearchApiUtil = {
  searchTopics: function(query){
    $.ajax({
      url: "api/topics/search",
      type: "GET",
      data: {query:query},
      success: function(topics){
        TopicSearchActions.receiveResults(topics);
      }
    });
  }
};

module.exports = TopicSearchApiUtil;
