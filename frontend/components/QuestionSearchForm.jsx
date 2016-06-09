var React = require("react");
var QuestionApiUtil = require("../util/questionApiUtil");
var QuestionStore = require("../stores/questionStore");
var QuestionSearchStore = require("../stores/QuestionSearchStore");
var QuestionSearchApiUtil = require("../util/questionSearchApiUtil");

var Modal = require("react-modal");

var QuestionSearchForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {body: "", results:{}, modalOpen:false};
  },

  _onChange: function(){
    var question = QuestionStore.getNewestQuestion();
    if (question && question.body === this.state.body) {
      var route = "/questions/" + question.id;
      this.context.router.push(route);
    }
    this.setState({results: QuestionSearchStore.results()});
  },

  componentDidMount: function(){
    this.formListener = QuestionStore.addListener(this._onChange);
    this.searchListener = QuestionSearchStore.addListener(this._onChange)
  },

  componentWillUnmount: function(){
    this.formListener.remove();
  },

  _handleChange: function(e){
    this.setState({body: e.target.value});
  },

  searchChange: function(e){
    QuestionSearchApiUtil.searchQuestions(this.state.body);
  },

  handleSubmit: function(){
    QuestionApiUtil.createQuestion({body:this.state.body});
  },

  resultsArray: function() {
    var resultsArr = [];
    var keys = Object.keys(this.state.results);
    var limit = keys.length > 6 ? 6 : keys.length;
    for (var i = 0; i < limit; i++) {
      resultsArr.push(this.state.results[keys[i]]);
    }
    return resultsArr.slice(0,6);
  },

  openModal: function(){
    this.setState({modalOpen:true});
  },

  render: function(){
    var results = this.resultsArray();
    return(
      <div>
        <form className="question-form group" onSubmit={this.handleSubmit}>
          <input onClick={this.openModal}
                 className="question-input"
                 type="textarea"
                 onKeyUp={this.searchChange}
                 onChange={this._handleChange}
                 placeholder="Ask or search for questions"
                 value={this.state.body}
          />
          <input className="question-submit"
                 type="submit"
                 value="Submit Question"
          />
        </form>
        <Modal
          isOpen={this.state.modalOpen}
        >
          <form className="question-form group" onSubmit={this.handleSubmit}>
            <input
                   className="question-input"
                   type="textarea"
                   onKeyUp={this.searchChange}
                   onChange={this._handleChange}
                   value={this.state.body}
            />
            <input className="question-submit"
                   type="submit"
                   value="Submit Question"
            />
          </form>

          <ul className="question-search-results">
            {results.map(function(result, idx){
              return <li key={idx}> {result.body} </li>
            })}
          </ul>

        </Modal>
      </div>
    );
  }
});

module.exports = QuestionSearchForm;
