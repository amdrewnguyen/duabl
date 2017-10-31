import { RECEIVE_TEAMS,
         RECEIVE_TEAM,
         REMOVE_TEAM,
         REQUEST_TEAMS,
         REQUEST_TEAM } from '../actions/team_actions';
import merge from 'lodash/merge';

const UsersReducer = (state = {}, action) => {
  // console.log(action.type);
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TEAMS:
      return merge({}, state, action.users);
    default:
      return merge({}, state);
  }
};

export default UsersReducer;
