import { RECEIVE_TASKS,
         RECEIVE_TASK,
         REMOVE_TASK,
         REQUEST_TASKS,
         REQUEST_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';

const TasksReducer = (state = {}, action) => {
  console.log(action.type);
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TASKS:
      return merge({}, state, action.tasks);
    case RECEIVE_TASK:
      return merge({}, state, { [action.task.id]: action.task });
    case REMOVE_TASK:
      newState = merge({}, state);
      delete newState[action.taskId];
      return newState;
    default:
      return merge({}, state);
  }
};

export default TasksReducer;
