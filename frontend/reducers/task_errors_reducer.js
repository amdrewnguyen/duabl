import { RECEIVE_TASK_ERRORS,
         RECEIVE_TASKS,
         RECEIVE_TASK,
         REMOVE_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';

const TaskErrorsReducer = (state = { errors: [] }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TASK_ERRORS:
      return { errors: action.errors };
    case RECEIVE_TASKS:
    case RECEIVE_TASK:
    case REMOVE_TASK:
      return { errors: [] };
    default:
      return merge({}, state);
  }
};

export default TaskErrorsReducer;
