import React from 'react';
import ReactDOM from 'react-dom';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SessionFormContainer from './session/session_form_container';
import TopBar from './header';
import SideBar from './side_bar';
import Modal from './modal';
import MainView from './main/main_view';
import { AuthRoute } from './route/route_util';
import { receivePath } from '../actions/ui_actions';


const mapStateToProps = (state) => (
  {
    sidebarOpen: state.ui.sidebarOpen,
    dropdownOpen: state.ui.dropdownOpen,
    dropdown: state.ui.dropdown,
    dropdownToggle: state.ui.dropdownToggle,
  }
);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    receivePath: (params) => dispatch(receivePath(params)),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.receivePath(this.props.match.params);
    this.setState({dropdown: this.props.dropdown,
                   dropdownOpen: this.props.dropdownOpen,
                   dropdownToggle: this.props.dropdownToggle});
  }

  componentWillReceiveProps(newProps) {
    if ((newProps.match.params.projectId !== this.props.match.params.projectId) ||
          (newProps.match.params.taskId !== this.props.match.params.taskId)) {
            this.props.receivePath(newProps.match.params);
          }
    if (newProps.dropdown !== this.props.dropdown) {
      this.setState({dropdown: newProps.dropdown});
    }
    if (newProps.dropdownOpen !== this.props.dropdownOpen) {
      this.setState({dropdownOpen: newProps.dropdownOpen});
    }
    if (newProps.dropdownToggle !== this.props.dropdownToggle) {
      this.setState({dropdownToggle: newProps.dropdownToggle});
    }
  }

  handleClick(e) {
    if (this.state.dropdownOpen && !ReactDOM.findDOMNode(this.state.dropdown).contains(event.target)) {
      this.state.dropdownToggle();
    }
  }

  render() {
    const closedSidebarStyle = {
      "width": "calc(100% + 245px)",
      "margin": "0 -245px"
    };
    return (
      <div className="app" onClick={this.handleClick} style={this.props.sidebarOpen ? {} : closedSidebarStyle}>
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <TopBar />
        <SideBar />
        <Route path="/:projectId/:taskId" component={MainView} />
        <Modal />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
