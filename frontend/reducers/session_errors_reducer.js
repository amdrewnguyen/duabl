import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS
} from '../actions/session_actions';
import merge from 'lodash/merge';

const SessionErrorsReducer = (state = { errors: [] }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { errors: [] };
    case RECEIVE_ERRORS:
      return merge({}, state, { errors: action.errors });
    default:
      return merge({}, state);
  }
};

export default SessionErrorsReducer;