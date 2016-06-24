var React = require("react"),
  Link = require("react-router").Link,
  TopicStore = require("../stores/topicStore"),
  Modal = require("react-modal"),
  TopicSearchApiUtil = require("../util/topicSearchApiUtil"),
  TopicSearchStore = require("../stores/topicSearchStore"),
  TopicApiUtil = require("../util/topicApiUtil"),
  SessionStore = require("../stores/sessionStore"),
  modalStyle = require("../styles/questionModal");

var QuestionTopics = React.createClass({
    getInitialState: function(){
      var potentialTopics = TopicStore.all();
      var topics = potentialTopics ? potentialTopics : {};
      topics["newTopics"] = [];
      var questionAuthorId = this.props.questionAuthor;
      return ({
        topics: topics,
        questionAuthorId: questionAuthorId,
        editing: false,
        editTopics: JSON.parse(JSON.stringify(topics)),
        topicSearch: "",
        searchResults: {}
      });
    },

    onSearchChange: function(){
      this.setState({searchResults: TopicSearchStore.results()});
    },

    onTopicChange: function(){
      var topics = TopicStore.all();
      this.setState({
        topics: topics,
        editTopics: JSON.parse(JSON.stringify(topics))
      });
    },

    componentDidMount: function(){
      this.searchListener = TopicSearchStore.addListener(this.onSearchChange);
      this.topicListener = TopicStore.addListener(this.onTopicChange);
      if (this.props.questionId) {
        TopicApiUtil.fetchQuestionTopics(this.props.questionId);
      }
    },

    componentWillReceiveProps: function(e){
      if (e.questionId) {
        TopicApiUtil.fetchQuestionTopics(e.questionId);
      }
      if (e.questionAuthor) {
        this.setState({questionAuthorId: e.questionAuthor});
      }
    },

    componentWillUnmount: function(){
      this.searchListener.remove();
      this.topicListener.remove();
    },

    handleChange: function(e){
      this.setState({topicSearch: e.target.value})
    },

    topicSearch: function(){
      TopicSearchApiUtil.searchTopics(this.state.topicSearch);
    },

    onModalClose: function(){
      var topics = this.state.topics;
      this.setState({
        editing: false,
        editTopics: JSON.parse(JSON.stringify(topics)),
        topics: topics
      });
    },

    removeEditTopic: function(e){
      var topics = this.state.editTopics;
      delete topics[e.target.dataset.topicid];
      this.setState({editTopics: topics});
    },

    addEditTopic: function(e){
      e.preventDefault();
      var topics = this.state.editTopics ? this.state.editTopics : {};
      var data = e.target.dataset;
      var newTopic = {
        id: data.topicid,
        name: data.topicname
      };
      topics[newTopic.id] = newTopic;

      this.setState({editTopics: topics});
    },

    updateTopics: function(e){
      e.preventDefault();
      TopicApiUtil.updateQuestionTopics(this.props.questionId, this.state.editTopics);
      var newTopics = JSON.parse(JSON.stringify(this.state.editTopics));
      this.setState({editing: false, topics: newTopics});
    },

    openEdit: function(e){
      e.preventDefault();
      this.setState({editing: true});
    },

    toArray: function(object){
      var resultsArr = [];
      var keys = Object.keys(object);
      var limit = keys.length > 10 ? 10 : keys.length;
      for (var i = 0; i < limit; i++) {
        if (keys[i] === "newTopics"){
          var newTopics = object[keys[i]]
          for (var i = 0; i < newTopics.length; i++) {
            var name = newTopics[i];
            resultsArr.push({name: name, id: i});
          }
        } else{
          resultsArr.push(object[keys[i]]);
        }
      }
      return resultsArr;
    },

    ownerEdit: function(){
      if (SessionStore.currentUser().id===this.props.questionAuthor){
        return(
          <p className="topic-item" onClick={this.openEdit}>Edit Topics</p>
        );
      } else{
        return (
          <div></div>
        );
      }
    },

    createTopic: function(e){
      e.preventDefault();
      var newTopic = this.state.topicSearch;
      var topics = this.state.editTopics ? this.state.editTopics : {newTopics: []};
      topics["newTopics"] = [];
      topics["newTopics"].push(newTopic);
      this.setState({editTopics: topics, topicSearch: ""});
    },

    render: function(){
      var results = this.toArray(this.state.searchResults);
      var topics = this.toArray(this.state.topics);
      var editTopics = this.toArray(this.state.editTopics);
      var dropdownClass = results.length > 0 ? "topic-search-dropdown" : "hidden";
      var comp = this;
      var ownerEdit = this.ownerEdit();
      var createTopicButton = (results.length === 0 && this.state.topicSearch.length > 0) ? "submit-button good-button" : "hidden"
      return(
        <div>
          <Modal
            isOpen={this.state.editing}
            onRequestClose={this.onModalClose}
            style={modalStyle}
          >
            <div className="edit-topics-modal" onClick={this.modalClick}>
              <h2 className="index-header"> Edit Topics</h2>

              <form onSubmit={this.updateTopics}>

                <div className="question-topics">
                  {editTopics.map(function(topic, idx){
                    return(
                      <div key={idx} className="topic-edit-item">
                        <span
                          onClick={comp.removeEditTopic}
                          data-topicid={topic.id}
                        >
                          x
                        </span>

                        <p className="topic-item">{topic.name}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="select-topic">
                  <input
                    type="text"
                    placeholder="Select Topic"
                    onKeyUp={this.topicSearch}
                    onChange={this.handleChange}
                    value={this.state.topicSearch}
                    onClick={this.inputClick}
                  />

                  <ul className={dropdownClass}>
                    {results.map(function(result, idx){
                      return(
                       <li
                          key={idx}
                          data-topicid={result.id}
                          data-topicname={result.name}
                          onClick={comp.addEditTopic}
                        >
                        {result.name}
                      </li>
                      )
                    })}
                  </ul>
                </div>

                <button onClick={this.createTopic} className={createTopicButton}>Create Topic</button>

                <div className="button-bar group">
                  <button
                    onClick={this.handleUpdate}
                    className="submit-button good-button"
                  >
                    Update
                  </button>
                  <p className="edit-cancel" onClick={this.onModalClose}>Cancel</p>
                </div>

              </form>

            </div>
          </Modal>

          <div className="question-topics">
            {topics.map(function(topic, idx){
              return <Link className="topic-item" key={idx} to={"topics/"+topic.id}>{topic.name}</Link>
            })}
            {ownerEdit}
          </div>

        </div>
      );
    }
});

module.exports = QuestionTopics;
