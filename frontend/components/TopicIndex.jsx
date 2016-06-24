var React = require("react");
var TopicStore = require("../stores/topicStore");
var TopicApiUtil = require("../util/topicApiUtil");
var Link = require('react-router').Link;

var TopicIndex = React.createClass({
  getInitialState: function(){
    var potentialTopics = TopicStore.all();
    var topics = potentialTopics ? potentialTopics : {};
    return {topics: topics};
  },

  onChange: function(){
    var potentialTopics = TopicStore.all();
    var topics = potentialTopics ? potentialTopics : {};

    this.setState({topics: topics});
  },

  componentDidMount: function(){
    this.listener = TopicStore.addListener(this.onChange);
    TopicApiUtil.fetchAllTopics();
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  topicArray: function() {
    var topicArr = [];
    var keys = Object.keys(this.state.topics);
    for (var i = 0; i < keys.length; i++) {
      topicArr.push(this.state.topics[keys[i]]);
    }
    return topicArr;
  },

  render: function(){
    var topicArray = this.topicArray();
    return(
      <div className="topic-index">
        <h3 className="index-header">Followed topics</h3>
        <ul>
          {topicArray.map(function(topic, idx){
            return (
              <li key={idx}>
                <Link className="topic-index-item" to={"topics/"+topic.id}>{topic.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = TopicIndex;
