import React from 'react';
import { Route } from 'react-router-dom';

import SessionFormContainer from './session/session_form_container';
import Header from './header';
import SideBar from './side_bar';
import Modal from './modal';
import MainView from './main/main_view';
import { AuthRoute } from './route/route_util';

const App = () => {
  return (
    <div className="app">
      <Header />
      <SideBar />
      <MainView />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <Modal />
    </div>
  );
};

export default App;
