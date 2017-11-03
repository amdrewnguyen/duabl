import { OPEN_MODAL,
         CLOSE_MODAL,
         OPEN_DROPDOWN,
         CLOSE_DROPDOWN,
         OPEN_SIDEBAR,
         CLOSE_SIDEBAR,
         SELECT_TASK,
         UNSELECT_TASK,
         UPDATE_SELECTED_TASK,
         RECEIVE_PATH } from '../actions/ui_actions';
import { RECEIVE_USERS } from '../actions/user_actions';
import merge from 'lodash/merge';

const modalOffState = {
  modal: null,
  options: {},
  sidebarOpen: true,
  dropdownOpen: false,
  dropdown: null,
  dropdownToggle: null,
  projectId: null,
  selectedTaskId: null,
  selectedTask: null,
  selectedTaskName: "",
  foundUsers: [],
};

const UIReducer = (state = modalOffState, action) => {
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
    case OPEN_DROPDOWN:
      return merge(
        {},
        state,
        {
          dropdownOpen: true,
          dropdown: action.component,
          dropdownToggle: action.callback,
        }
      );
    case CLOSE_DROPDOWN:
      return merge({}, state, {
        dropdownOpen: false,
        dropdown: null,
        dropdownToggle: null,
      });
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
    case RECEIVE_USERS:
      return merge({}, state, {foundUsers: Object.values(action.users)});
    default:
      return merge({}, state);
  }
};

export default UIReducer;
