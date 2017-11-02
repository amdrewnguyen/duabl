import * as UserAPI from '../util/user_utils';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

export const receiveUsers = (users) => (
  {
    type: RECEIVE_USERS,
    users,
  }
);

export const receiveUserErrors = (errors) => (
  {
    type: RECEIVE_USER_ERRORS,
    errors
  }
);

export const searchUsers = (queryString) => (dispatch) => {
  UserAPI.searchUsers(queryString)
    .then(
      (results) => dispatch(receiveUsers(results)),
      (errors) => dispatch(receiveUserErrors(errors))
    );
};
