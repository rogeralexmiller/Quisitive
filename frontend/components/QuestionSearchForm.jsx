var React = require("react");
var QuestionApiUtil = require("../util/questionApiUtil");
var QuestionStore = require("../stores/questionStore");
var QuestionSearchStore = require("../stores/questionSearchStore");
var QuestionSearchApiUtil = require("../util/questionSearchApiUtil");
var questionSearchModal = require("../styles/questionSearchModal");
var Link = require("react-router").Link;
var ReactRouter = require('react-router');
var hashHistory = ReactRouter.hashHistory;
var ReactDOM = require("react-dom");

var Modal = require("react-modal");

var QuestionSearchForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {body: "", results:[], modalOpen:false};
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
    this.searchListener.remove();
  },

  _handleChange: function(e){
    this.setState({body: e.target.value});
  },

  searchChange: function(e){
    QuestionSearchApiUtil.searchQuestions(this.state.body);
  },

  handleSubmit: function(e){
    e.preventDefault();
    QuestionApiUtil.createQuestion({body:this.state.body}, function(id){
      hashHistory.push("questions/"+id);
    });
    this.setState({
      body: "",
      modalOpen:false,
      results: []
    })
  },

  goToQuestion: function(e){
    this.setState({modalOpen:false, results: [], body: ""});
    this.context.router.push("questions/"+e.target.dataset.questionid);
  },

  openModal: function(e){
    e.preventDefault();
    this.setState({modalOpen:true, results: [], body: ""});
    setTimeout(function(){
      if (this.refs.questionInput) {
        ReactDOM.findDOMNode(this.refs.questionInput).focus();
      }
    }.bind(this),0)
  },

  onModalClose: function(){
    this.setState({
      modalOpen:false,
      body:"",
      results: []
    });
  },

  render: function(){
    var comp = this;
    var submitClass = this.state.body.length > 0 ? "question-submit" : "question-submit disabled";
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
                 onClick={this.openModal}
                 value="Ask a Question"

          />
        </form>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.onModalClose}
          style={questionSearchModal}
        >

          <header className="header">
            <nav className="header-nav group">
              <a className="header-logo" href="#/questions">
                Quisitive
              </a>
              <div className="question-search-select group">
                <form className="question-form group" onSubmit={this.handleSubmit}>
                  <input
                         className="question-input modal-input"
                         type="textarea"
                         placeholder="Ask or search for questions"
                         onKeyUp={this.searchChange}
                         onChange={this._handleChange}
                         value={this.state.body}
                         ref="questionInput"
                  />
                  <input className= {submitClass}
                         type="submit"
                         value="Submit Question"
                         disabled={!this.state.body}
                  />
                </form>

                <ul className="question-search-results">
                  {this.state.results.slice(0,10).map(function(result){
                    return (
                     <p
                        onClick={comp.goToQuestion}
                        className="result-item"
                        key={result.id}
                        data-questionid={result.id}
                      >
                        {result.body}
                    </p>
                   )
                  })}
                </ul>
              </div>
            </nav>
          </header>

        </Modal>
      </div>
    );
  }
});

module.exports = QuestionSearchForm;
