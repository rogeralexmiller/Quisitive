var React = require("react");
var Link = require("react-router").Link;
var TopicStore = require("../stores/topicStore");
var Modal = require("react-modal");
var TopicSearchApiUtil = require("../util/topicSearchApiUtil");
var TopicSearchStore = require("../stores/topicSearchStore");

var modalStyle = require("../styles/questionModal");

var QuestionTopics = React.createClass({
    getInitialState: function(){
      var topics = this.props.question.topics ? this.props.question.topics : [];
      return ({
        topics: topics,
        editing: false,
        editTopics: topics,
        topicSearch:"",
        searchResults:[]
      });
    },

    onChange: function(){
      this.setState({searchResults:TopicSearchStore.results()})
    },

    componentDidMount: function(){
      this.searchListener = TopicSearchStore.addListener(this.onChange);
    },

    componentWillUnmount: function(){
      this.searchListener.remove();
    },

    handleChange: function(e){
      this.setState({topicSearch: e.target.value})
    },

    topicSearch: function(){
      TopicSearchApiUtil.searchTopics(this.state.topicSearch);
    },

    handleCancel: function(){
      this.setState({editing: false});
    },

    removeEditTopic: function(e){

    },

    handleUpdate: function(){

    },

    onModalClose: function(){
      this.setState({modalOpen:false})
    },

    openEdit: function(e){
      e.preventDefault();
      this.setState({editing: true});
    },

    render: function(){
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
                  {this.state.editTopics.map(function(topic,idx){
                    return(
                      <div key={idx} className="topic-edit-item">
                        <span onClick={this.removeEditTopic} topicId={idx}>x</span>
                        <a href="#">{topic.name}</a>
                      </div>
                    );
                  })}
                  <input
                    type="text"
                    placeholder="Select Topic"
                    onKeyUp={this.topicSearch}
                    onChange={this.handleChange}
                    value={this.state.topicSearch}/>
                </div>
                <div className="button-bar">
                  <button
                    onClick={this.handleUpdate}
                    className="submit-button good-button"
                  >
                    Update
                  </button>
                  <a onClick={this.onModalClose} href="#">Cancel</a>
                </div>
              </form>

            </div>
          </Modal>

          <div className="question-topics">
            {this.state.topics.map(function(topic, idx){
              return <Link key={idx} to={"topics/"+topic.id}>{topic.name}</Link>
            })}
            <a href="#" onClick={this.openEdit}>Edit Topics</a>
          </div>

        </div>
      );
    }
});

module.exports = QuestionTopics;
