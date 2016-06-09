var React = require("react");
var Link = require("react-router").Link;
var TopicStore = require("../stores/topicStore");

var QuestionTopics = React.createClass({
    getInitialState: function(){
      var topics = this.props.question.topics ? this.props.question.topics : [];
      return {topics: topics, editing: false}
    },

    render: function(){
      return(
        <div className="question-topics">
          {topics.map(function(topic, idx){
            return <Link key={idx} to={"topics/"+topic.id}>{topic.name}</Link>
          })}
        </div>
      );
    }
});

module.exports = QuestionTopics;
