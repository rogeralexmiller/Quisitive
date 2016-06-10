var React = require("react");
var Link = require("react-router").Link;
var TopicStore = require("../stores/topicStore");
var Modal = require("react-modal");
var TopicSearchApiUtil = require("../util/topicSearchApiUtil");
var TopicSearchStore = require("../stores/topicSearchStore");
var TopicApiUtil = require("../util/topicApiUtil");
var SessionStore = require("../stores/sessionStore");

var modalStyle = require("../styles/questionModal");

var QuestionTopics = React.createClass({
    getInitialState: function(){
      var potentialTopics = TopicStore.all();
      var topics = potentialTopics ? potentialTopics : {};
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
        editTopics: JSON.parse(JSON.stringify(topics))
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
      this.setState({editing: false});
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
        resultsArr.push(object[keys[i]]);
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

    render: function(){
      var results = this.toArray(this.state.searchResults);
      var topics = this.toArray(this.state.topics);
      var editTopics = this.toArray(this.state.editTopics);

      var dropdownClass = results.length > 0 ? "topic-search-dropdown" : "hidden";
      var comp = this;
      var ownerEdit = this.ownerEdit();
      return(
        <div>
          <Modal
            isOpen={this.state.editing}
            onRequestClose={this.onModalClose}
            style={modalStyle}
          >
            <div className="edit-topics-modal">
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
