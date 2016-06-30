var React = require("react");
var TopicStore = require("../stores/topicStore");
var TopicApiUtil = require("../util/topicApiUtil");
var TopicIndexItem = require("./TopicIndexItem");

var TopicsIndex = React.createClass({
  getInitialState: function(){
    var topics = TopicStore.all(this.props.params.topicId);
    return {topics: topics};
  },

  _onChange: function(){
    this.setState({topics: TopicStore.all(this.props.params.topicId)});
  },

  componentDidMount: function(){
    this.topicListener = TopicStore.addListener(this._onChange);
    TopicApiUtil.fetchAllTopics();
  },

  componentWillUnmount: function(){
    this.topicListener.remove();
  },

  render: function(){
    return (
      <div className="topics-index">
        {this.props.children}
        {this.state.topics.map(function(topic){
          return(
            <TopicIndexItem key={topic.id} topic={topic}/>
          )
        })}
      </div>
    );
  }
});

module.exports = TopicsIndex;
