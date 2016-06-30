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
        editTopics: topics.slice(),
        topicSearch: "",
        searchResults: []
      });
    },

    onSearchChange: function(){
      this.setState({searchResults: TopicSearchStore.results()});
    },

    onTopicChange: function(){
      var topics = TopicStore.all();
      this.setState({
        topics: topics,
        editTopics: topics.slice()
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
        editTopics: topics.slice(),
        topics: topics
      });
    },

    removeEditTopic: function(e){
      var topics = this.state.editTopics;
      var data = e.target.dataset;
      topics = topics.filter(function(topic){
        if (data.topicid === data.topicname) {
          return topic.id !== data.topicid;
        } else{
          return topic.id !== parseInt(data.topicid);
        }
      });
      this.setState({editTopics: topics});
    },

    addEditTopic: function(e){
      e.preventDefault();
      var topics = this.state.editTopics ? this.state.editTopics : [];
      var data = e.target.dataset;
      var newTopic = {
        id: data.topicid,
        name: data.topicname
      };
      topics.push(newTopic);

      this.setState({editTopics: topics, topicSearch: "", searchResults: []});
    },

    updateTopics: function(e){
      e.preventDefault();
      TopicApiUtil.updateQuestionTopics(this.props.questionId, this.state.editTopics);
      var newTopics = this.state.editTopics.slice();
      this.setState({editing: false, topics: newTopics, topicSearch: ""});
    },

    openEdit: function(e){
      e.preventDefault();
      this.setState({editing: true});
    },

    ownerEdit: function(){
      if (SessionStore.currentUser().id === this.props.questionAuthor){
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
      var newTopic = {id: this.state.topicSearch, name: this.state.topicSearch};
      var topics = this.state.editTopics;
      topics.push(newTopic);
      this.setState({editTopics: topics, topicSearch: ""});
    },

    renderTopicSearchDropdown: function(){
      var comp = this;
      var dropdownClass = this.state.searchResults.length > 0 ? "topic-search-dropdown" : "hidden";
      return(
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
            {this.state.searchResults.map(function(result, idx){
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
      )
    },

    renderModal: function(){
      var comp = this;
      var createTopicButton = (this.state.searchResults.length === 0 && this.state.topicSearch.length > 0) ? "submit-button good-button" : "hidden";
      return(
        <Modal
          isOpen={this.state.editing}
          onRequestClose={this.onModalClose}
          style={modalStyle}
        >
          <div className="edit-topics-modal" onClick={this.modalClick}>
            <h2 className="index-header"> Edit Topics</h2>

            <form onSubmit={this.updateTopics}>

              <div className="question-topics">
                {this.state.editTopics.map(function(topic, idx){
                  return(
                    <div key={idx} className="topic-edit-item">
                      <span
                        onClick={comp.removeEditTopic}
                        data-topicid={topic.id}
                        data-topicname={topic.name}
                        data-new={topic.new}
                      >
                        x
                      </span>

                      <p className="topic-item">{topic.name}</p>
                    </div>
                  );
                })}
              </div>

              {this.renderTopicSearchDropdown()}

              <div className="button-bar group">
              <button onClick={this.createTopic} className={createTopicButton}>Create Topic</button>
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
      )
    },

    render: function(){
      var ownerEdit = this.ownerEdit();

      return(
        <div>
            {this.renderModal()}
          <div className="question-topics">
            {this.state.topics.map(function(topic, idx){
              return <Link className="topic-item" key={idx} to={"topics/"+topic.id}>{topic.name}</Link>
            })}
            {ownerEdit}
          </div>

        </div>
      );
    }
});

module.exports = QuestionTopics;
