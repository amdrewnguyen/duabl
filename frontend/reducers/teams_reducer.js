import { RECEIVE_TEAMS,
         RECEIVE_TEAM,
         REMOVE_TEAM,
         REQUEST_TEAMS,
         REQUEST_TEAM } from '../actions/team_actions';
import merge from 'lodash/merge';

const TeamsReducer = (state = {}, action) => {
  // console.log(action.type);
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TEAMS:
      return merge({}, state, action.teams);
    case RECEIVE_TEAM:
      if (action.team) {
        return merge({}, state, { [action.team.id]: action.team });
      }
      return merge({}, state);
    case REMOVE_TEAM:
      newState = merge({}, state);
      delete newState[action.teamId];
      return newState;
    default:
      return merge({}, state);
  }
};

export default TeamsReducer;
