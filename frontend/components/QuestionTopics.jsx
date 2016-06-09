var React = require("react");
var Link = require("react-router").Link;
var TopicStore = require("../stores/topicStore");

var QuestionTopics = React.createClass({
    getInitialState: function(){
      var topics = this.props.question.topics ? this.props.question.topics : [];
      return {topics: topics, editing: false, editTopics: topics};
    },

    handleTopicSearch: function(){

    },

    handleCancel: function(){
      this.setState({editing: false});
    },

    handleUpdate: function(){

    },

    openEdit: function(){
      this.setState({editing: true});
    },

    render: function(){
      return(
        <div>
          <div className="edit-topics-modal">
            <h2 className="index-header"> Edit Topics</h2>

            <form onSubmit={this.updateTopics}>
              <div className="question-topics">
                {this.state.editTopics.map(function(topic,idx){
                  return(
                    <div key={idx} className="topic-edit-item">
                      <span topicId={idx}>x</span>
                      <a href="#">{topic.name}</a>
                    </div>
                  );
                })}
                <input type="text" placeholder="Select Topic" onChange={this.handleTopicSearch}/>
              </div>
              <div className="button-bar">
                <button onClick={this.handleUpdate} className="submit-button good-button"> Update </button>
                <a onClick={this.handleCancel} href="#">Cancel</a>
              </div>
            </form>

          </div>
          <div className="question-topics">
            {topics.map(function(topic, idx){
              return <Link key={idx} to={"topics/"+topic.id}>{topic.name}</Link>
            })}
            <a href="#" onClick={this.openEdit}>Edit Topics</a>
          </div>

        </div>
      );
    }
});

module.exports = QuestionTopics;
