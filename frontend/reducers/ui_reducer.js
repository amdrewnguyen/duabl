import { OPEN_MODAL,
         CLOSE_MODAL,
         RECEIVE_PATH } from '../actions/ui_actions';
import merge from 'lodash/merge';

const modalOffState = {
  modal: null,
  options: {},
  projectId: null,
  taskId: null,
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
      return merge({}, state, {modal: null, options: {}});
    case RECEIVE_PATH:
      return merge({}, state,
        {
          projectId: action.projectId,
          taskId: action.taskId === "list" ? null : action.taskId,
        }
      );
    default:
      return merge({}, state);
  }
};

export default UIReducer;
