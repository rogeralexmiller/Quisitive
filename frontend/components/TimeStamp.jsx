var React = require("react");

var TimeStamp = React.createClass({
  render: function(){
    var timestamp = this.props.time;
    var time = timestamp+" ago";
    return(
      <p className="time">
        {time}
      </p>
    )
  }
});

module.exports = TimeStamp;
