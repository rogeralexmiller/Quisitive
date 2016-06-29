var React = require("react");
var FollowStore = require("../stores/followStore");
var FollowApiUtil = require("../util/followApiUtil");

var FollowToggle = React.createClass({
  getInitialState: function(){
    return {followed: false};
  },

  componentDidMount: function(){
    this.followListener = FollowStore.addListener(this._onChange);
    FollowApiUtil.getUserFollows();
  },

  _onChange: function(){
    var type = this.props.followableType;
    var id = this.props.followableId;
    this.setState({followed: FollowStore.isFollowing(type, id)});
  },

  componentWillUnmount: function(){
    this.followListener.remove();
  },

  followToggle: function(){
    var type = this.props.followableType;
    var id = this.props.followableId;
    if (this.state.followed) {
      var follow = FollowStore.find(type, id);
      FollowApiUtil.removeFollow(follow);
      this.setState({followed: false});
    } else{
      FollowApiUtil.createFollow(type, id);
      this.setState({followed: true});
    }
  },

  render: function(){
    var followState = this.state.followed ? "Unfollow" : "Follow";
    return(
      <div className="follow-toggle">
        <button onClick={this.followToggle}>{followState}</button>
      </div>
    )
  }
});

module.exports = FollowToggle;
