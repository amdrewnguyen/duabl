import { OPEN_MODAL,
         CLOSE_MODAL, } from '../actions/ui_actions';
import merge from 'lodash/merge';

const modalOffState = {
  modal: null,
  options: {},
};

const UIReducer = (state = modalOffState, action) => {
  console.log(action.type);
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case OPEN_MODAL:
      return merge(
        {},
        state,
        {
          modal: action.component,
          options: action.options,
        }
      );
    case CLOSE_MODAL:
      return merge({}, state, modalOffState);
    default:
      return merge({}, state);
  }
};

export default UIReducer;
