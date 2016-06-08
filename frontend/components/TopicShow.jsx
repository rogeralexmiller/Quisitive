var React = require("react");
var TopicStore = require("../stores/topicStore");
var TopicApiUtil = require("../util/topicApiUtil");
var Link = require('react-router').Link;
var SessionStore = require("../stores/sessionStore");
var HeaderNav = require("./HeaderNav");
var TopicQuestionIndex = require("./TopicQuestionIndex");

var TopicShow = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    var potentialTopic = TopicStore.find(this.props.params.topicId);
    var topic = potentialTopic ? potentialTopic : {};
    return {topic: topic, editing: false, topicForm: topic.name};
  },

  componentWillReceiveProps: function(){
    TopicApiUtil.getTopic(this.props.params.topicId);
  },

  handleBodyChange: function(e){
    this.setState({topicForm: e.value});
  },

  _onChange: function(){
    var potentialTopic = TopicStore.find(this.props.params.topicId);
    var topic = potentialTopic ? potentialTopic : {};

    this.setState({topic: topic, topicForm: topic.name});
  },

  componentDidMount: function(){
    this.listener = TopicStore.addListener(this._onChange);
    TopicApiUtil.getTopic(this.props.params.topicId);
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  handleUpdate: function(e){
    e.preventDefault();
    var topicData = {
      id: this.state.topic.id,
      author_id: this.state.topic.author_id,
      body: this.state.topic.body
    };
    TopicApiUtil.updateTopic(topicData);
    this.setState({editing:false});
  },

  handleEdit: function(){
    this.setState({editing:true});
  },

  handleCancel: function(e){
    e.preventDefault();
    this.setState({editing:false});
  },

  handleDelete: function(){
    TopicApiUtil.deleteTopic(this.state.topic.id)
    this.context.router.push("/questions");
  },

  ownerButtons:  function(){
    if (SessionStore.currentUserOwns(this.state.topic)) {
      return (
        <div>
          <button onClick={this.handleEdit} className="answer-button">Edit</button>
          <button onClick={this.handleDelete} className="submit-button delete">Delete</button>
        </div>
      )} else{
      return(<div> </div>);
    }
  },

  render: function(){
    var editClass = this.state.editing ? "question-edit-form topic-form group" : "hidden";
    var topicClass = this.state.editing ? "hidden" : "show-header topic-header group";
    return(
      <div>

        <form className={editClass}>
          <input type="text" className="question-edit-input" onChange={this.handleBodyChange} value={this.state.topicForm}/>
          <button onClick={this.handleUpdate} className="submit-button good-button"> Update </button>
          <a onClick={this.handleCancel} href="#">Cancel</a>
        </form>

        <div className={topicClass}>

          <p>
            {this.state.topic.name}
          </p>

          {this.ownerButtons()}
        </div>
        <TopicQuestionIndex questions={this.state.topic.questions}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TopicShow;
