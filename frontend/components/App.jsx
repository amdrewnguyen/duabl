import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import SessionFormContainer from './session/session_form_container';
import TopBar from './header';
import SideBar from './side_bar';
import Modal from './modal';
import MainView from './main/main_view';
import { AuthRoute } from './route/route_util';

const mapStateToProps = (state) => (
  {
    sidebarOpen: state.ui.sidebarOpen,
  }
);

class App extends React.Component {

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

export default connect(mapStateToProps, null)(App);
