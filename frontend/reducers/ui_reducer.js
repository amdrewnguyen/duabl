import { OPEN_MODAL,
         CLOSE_MODAL, } from '../actions/ui_actions';
import merge from 'lodash/merge';

const defaultState = {
  modal: null,
};

const UIReducer = (state = defaultState, action) => {
  console.log(action.type);
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case OPEN_MODAL:
      return merge({}, state, action.projects);
    case CLOSE_MODAL:
      return merge({}, state, { modal: null });
    default:
      return merge({}, state);
  }
};

export default UIReducer;
