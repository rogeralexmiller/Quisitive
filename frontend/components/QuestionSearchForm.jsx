var React = require("react");
var QuestionApiUtil = require("../util/questionApiUtil");
var QuestionStore = require("../stores/questionStore");

var QuestionSearchForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {body: "", charsLeft: 0};
  },

  onChange: function(){
    var question = QuestionStore.getNewestQuestion();

    if (question && question.body === this.state.body) {
      var route = "/questions/" + question.id;
      this.context.router.push(route);
    }
  },

  componentDidMount: function(){
    this.listener = QuestionStore.addListener(this.onChange);
    this.setState({body: ""});
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  _handleChange: function(e){
    var body = e.target.value;
    this.setState({body: body, charsLeft: remainder});
  },

  handleSubmit: function(){
    QuestionApiUtil.createQuestion({body:this.state.body});
  },

  render: function(){

    var text = this.state.body
    return(
      <form className="question-form group" onSubmit={this.handleSubmit}>
        <input className="question-input" type="textarea" onChange={this._handleChange} placeholder="Ask or search for questions" value={text}/>
        <input className="question-submit" type="submit" value="Submit Question"/>
      </form>
    );
  }
});

module.exports = QuestionSearchForm;
