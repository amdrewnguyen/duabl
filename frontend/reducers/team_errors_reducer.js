import { RECEIVE_TEAM_ERRORS,
         RECEIVE_TEAMS,
         RECEIVE_TEAM,
         REMOVE_TEAM } from '../actions/task_actions';
import merge from 'lodash/merge';

const TeamErrorsReducer = (state = [], action) => {
  // Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TEAM_ERRORS:
      return action.errors;
    case RECEIVE_TEAMS:
    case RECEIVE_TEAM:
    case REMOVE_TEAM:
      return [];
    default:
      return state;
  }
};

export default TeamErrorsReducer;
