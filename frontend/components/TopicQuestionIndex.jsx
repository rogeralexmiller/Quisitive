var React = require("react");
var QuestionsIndexItem = require("./QuestionsIndexItem");

var TopicQuestionIndex = React.createClass({

  render: function(){
    var questions = this.props.questions;
    var questionArr = questions ? questions : [];
    return(
      <div className="questions-index group">
        <ul>
          {questionArr.map(function(question, idx){
            return (
              <QuestionsIndexItem
                key={idx}
                question={question}
                commentCount={question.comments.length}
              />
            );
          })}
        </ul>
      </div>
    );
  }

});

module.exports = TopicQuestionIndex;
