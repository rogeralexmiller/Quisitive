var React = require("react");
var SessionStore = require("../stores/sessionStore");
var SessionApiUtil = require("../util/sessionApiUtil");
var QuestionSearchForm = require("./QuestionSearchForm");

var HeaderNav = React.createClass({

  getInitialState: function(){
    return {currentUser: SessionStore.currentUser()};
  },

  _onChange: function(){
    this.setState({currentUser: SessionStore.currentUser()});
  },

  componentDidMount: function(){
    this.listener = SessionStore.addListener(this._onChange);
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  handleLogout: function(){
    SessionApiUtil.logout()
  },

  render: function(){
    return (
      <header className="header">
        <nav className="header-nav group">
            <a className="header-logo" href="#/questions">
              Quisitive
            </a>
          <QuestionSearchForm/>
          <div className="header-list group">
            <a className="header-list-item" href={"#/users/"+this.state.currentUser.id}>
              <p>
                {this.state.currentUser.full_name}
              </p>
            </a>
            <a className="header-list-item" href="#"onClick={this.handleLogout}>
              Logout
            </a>
          </div>
        </nav>
      </header>
    );
  }
});

module.exports = HeaderNav;
