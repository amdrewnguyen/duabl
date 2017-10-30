import * as SessionAPI from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = user => (
  {
    type: RECEIVE_CURRENT_USER,
    user
  }
);

export const receiveErrors = errors => (
  {
    type: RECEIVE_ERRORS,
    errors
  }
);

export const login = user => dispatch => (
  SessionAPI.login(user)
    .then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    )
);

export const signup = user => dispatch => (
  SessionAPI.signup(user)
    .then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    )
);

export const logout = () => dispatch => (
  SessionAPI.logout()
    .then(
      () => dispatch(receiveCurrentUser(null)),
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    )
);

export const updateUser = (user) => dispatch => (
  SessionAPI.updateUser(user)
    .then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    )
);
