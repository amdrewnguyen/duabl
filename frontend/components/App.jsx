import React from 'react';
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
  }
);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    receivePath: (params) => dispatch(receivePath(params)),
  };
};

class App extends React.Component {

  componentDidMount() {
    this.props.receivePath(this.props.match.params);
  }

  componentWillReceiveProps(newProps) {
    if ((newProps.match.params.projectId !== this.props.match.params.projectId) ||
          (newProps.match.params.taskId !== this.props.match.params.taskId)) {
            this.props.receivePath(newProps.match.params);
          }
  }

  render() {
    const closedSidebarStyle = {
      "width": "calc(100% + 245px)",
      "margin": "0 -245px"
    };
    return (
      <div className="app" style={this.props.sidebarOpen ? {} : closedSidebarStyle}>
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
