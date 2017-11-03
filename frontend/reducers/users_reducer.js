import { RECEIVE_TEAMS,
         RECEIVE_TEAM,
         REMOVE_TEAM,
         REQUEST_TEAMS,
         REQUEST_TEAM } from '../actions/team_actions';
import {
         RECEIVE_CURRENT_USER
       } from '../actions/session_actions';
import {
         RECEIVE_USERS
       } from '../actions/user_actions';
import merge from 'lodash/merge';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TEAMS:
      return merge({}, state, action.users);
    case RECEIVE_CURRENT_USER:
      if (action.user) {
        return merge({}, state, {[action.user.id]: action.user});
      } else {
        return {};
      }
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    default:
      return merge({}, state);
  }
};

export default UsersReducer;
