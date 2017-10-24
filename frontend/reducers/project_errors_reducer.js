import { RECEIVE_PROJECT_ERRORS,
         RECEIVE_PROJECTS,
         RECEIVE_PROJECT,
         REMOVE_PROJECT } from '../actions/project_actions';
import merge from 'lodash/merge';

const SessionErrorsReducer = (state = { errors: [] }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT_ERRORS:
      return { errors: action.errors };
    case RECEIVE_PROJECTS:
    case RECEIVE_PROJECT:
    case REMOVE_PROJECT:
      return { errors: [] };
    default:
      return merge({}, state);
  }
};

export default SessionErrorsReducer;
