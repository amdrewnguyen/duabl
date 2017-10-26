import React from 'react';
import { Route } from 'react-router-dom';

import SessionFormContainer from './session/session_form_container';
import TopBar from './header';
import SideBar from './side_bar';
import Modal from './modal';
import MainView from './main/main_view';
import { AuthRoute } from './route/route_util';

const App = () => {
  return (
    <div className="app">
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <TopBar />
      <SideBar />
      <Route path="/:projectId/:taskId" component={MainView} />
      <Modal />
    </div>
  );
};

export default App;
