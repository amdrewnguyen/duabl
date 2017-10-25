import { RECEIVE_PROJECT_ERRORS,
         RECEIVE_PROJECTS,
         RECEIVE_PROJECT,
         REMOVE_PROJECT } from '../actions/project_actions';
import merge from 'lodash/merge';

const SessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT_ERRORS:
      return action.errors;
    case RECEIVE_PROJECTS:
    case RECEIVE_PROJECT:
    case REMOVE_PROJECT:
      return [];
    default:
      return state;
  }
};

export default SessionErrorsReducer;
