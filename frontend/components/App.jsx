import React from 'react';
import { Route } from 'react-router-dom';

import SessionFormContainer from './session/session_form_container';
import Header from './header';
import { AuthRoute } from './route/route_util';

const App = () => {
  return (
    <div>
      <Header />
      <h1>duabl</h1>
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
    </div>
  );
};

export default App;
