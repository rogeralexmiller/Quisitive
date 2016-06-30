var React = require("react");
var TopicStore = require("../stores/topicStore");
var TopicApiUtil = require("../util/topicApiUtil");
var FollowStore = require("../stores/followStore");
var FollowApiUtil = require("../util/followApiUtil");

var Link = require('react-router').Link;


var TopicIndex = React.createClass({
  getInitialState: function(){
    var potentialTopics = TopicStore.followedTopics();
    var topics = potentialTopics ? potentialTopics : [];
    return {topics: topics};
  },

  onChange: function(){
    var potentialTopics = TopicStore.followedTopics();
    var topics = potentialTopics ? potentialTopics : [];
    this.setState({topics: topics});
  },

  componentDidMount: function(){
    this.topicListener = TopicStore.addListener(this.onChange);
    this.followListener = FollowStore.addListener(this.onChange);
    FollowApiUtil.getUserFollows();
    TopicApiUtil.fetchFollowedTopics();
  },

  componentWillUnmount: function(){
    this.topicListener.remove();
    this.followListener.remove();
  },

  render: function(){
    return(
      <div className="topic-index">
        <h3 className="index-header">Followed topics</h3>
        <ul>
          {this.state.topics.map(function(topic){
            return (
              <li key={topic.id}>
                <Link className="topic-index-item" to={"topics/"+topic.id}>{topic.name}</Link>
              </li>
            );
          })}
          <li>
            <Link className="topic-index-item browse-topics" to={"topics"}>Browse Topics</Link>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = TopicIndex;
