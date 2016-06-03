var React = require("react");
var QuestionApiUtil = require("../util/questionApiUtil");

var QuestionEdit = React.createClass({
  getInitialState: function(){
    return {body: this.props.question.body};
  },

  handleChange: function(e){
    this.setState({body: e.target.value});
  },

  handleUpdate: function(){
    var questionData = {
      id: this.props.question.id,
      author_id: this.props.question.author_id,
      body: this.state.body
    };

    QuestionApiUtil.updateQuestion(questionData);
  },

  componentWillReceiveProps: function(){
    this.setState({editing:this.props.editing});
  },

  handleCancel: function(e){
    e.preventDefault();
    this.setState({editing:false});
  },

  render: function(){
    return(
      <form onSubmit={this.handleUpdate} className="question-edit-form">
        <input type="text" className="question-edit-input" onChange={this.handleChange} value={this.state.body}/>
        <a onClick={this.handleCancel} href="#">Cancel</a>
        <input type="submit" className="good-button" value="Update"/>
      </form>
    )
  }
});

module.exports = QuestionEdit;
