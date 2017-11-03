import { RECEIVE_TASKS,
         RECEIVE_TASK,
         REMOVE_TASK,
         REQUEST_TASKS,
         REQUEST_TASK } from '../actions/task_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import merge from 'lodash/merge';
import uniq from 'lodash/uniq';

const TasksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TASKS:
      return merge({}, state, action.tasks);
    case RECEIVE_TASK:
      newState = merge({}, state);
      if (action.task.parentId !== null) {
        let newSubtaskIds = uniq(newState[action.task.parentId].subtaskIds.concat([action.task.id]));
        newState[action.task.parentId].subtaskIds = newSubtaskIds;
      }
      if (action.task) {
        return merge({}, newState, { [action.task.id]: action.task });
      }
      return newState;
    case REMOVE_TASK:
      newState = merge({}, state);
      delete newState[action.taskId];
      return newState;
    case RECEIVE_CURRENT_USER:
      if (action.user) {
        return merge({}, state);
      } else {
        return {};
      }
    default:
      return merge({}, state);
  }
};

export default TasksReducer;
