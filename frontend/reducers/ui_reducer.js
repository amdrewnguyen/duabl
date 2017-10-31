import { OPEN_MODAL,
         CLOSE_MODAL,
         OPEN_SIDEBAR,
         CLOSE_SIDEBAR,
         SELECT_TASK,
         UNSELECT_TASK,
         UPDATE_SELECTED_TASK,
         RECEIVE_PATH } from '../actions/ui_actions';
import merge from 'lodash/merge';

const modalOffState = {
  modal: null,
  options: {},
  sidebarOpen: true,
  projectId: null,
  selectedTaskId: null,
  selectedTask: null,
  selectedTaskName: "",
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
    case OPEN_SIDEBAR:
      return merge({}, state, {sidebarOpen: true});
    case CLOSE_SIDEBAR:
      return merge({}, state, {sidebarOpen: false});
    case SELECT_TASK:
      return merge({}, state,
        { selectedTaskId: action.task.id,
          selectedTaskName: action.task.name,
          selectedTask: action.task });
    case UNSELECT_TASK:
      return merge({}, state,
        { selectedTaskId: null,
          selectedTaskName: "",
          selectedTask: null });
    case UPDATE_SELECTED_TASK:
      return merge({}, state,
        { selectedTaskName: action.value });
    default:
      return merge({}, state);
  }
};

export default UIReducer;
