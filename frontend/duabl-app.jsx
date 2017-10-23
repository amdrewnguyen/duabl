import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

  // Testing START
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // Testing END

  ReactDOM.render(<Root store={store}/>, root);
});
