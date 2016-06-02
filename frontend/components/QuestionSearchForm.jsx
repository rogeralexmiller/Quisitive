var React = require("react");
var QuestionApiUtil = require("../util/questionApiUtil");

var QuestionSearchForm = React.createClass({
  getInitialState: function(){
    return {body: ""};
  },

  _handleChange: function(e){
    this.setState({body: e.target.value});
  },

  handleSubmit: function(){
    QuestionApiUtil.createQuestion(this.state);
    this.setState({body:""});
  },

  render: function(){
    return(
      <form className="question-form group" onSubmit={this.handleSubmit}>
        <input className="question-input" type="text" onChange={this._handleChange} placeholder="Ask or search for questions" value={this.state.body}/>
        <input className="question-submit" type="submit" value="Submit Question"/>
      </form>
    );
  }
});

module.exports = QuestionSearchForm;
