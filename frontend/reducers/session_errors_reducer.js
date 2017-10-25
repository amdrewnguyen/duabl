import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS
} from '../actions/session_actions';
import merge from 'lodash/merge';

const SessionErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return [];
    case RECEIVE_ERRORS:
      return state.concat(action.errors);
    default:
      return state;
  }
};

export default SessionErrorsReducer;
