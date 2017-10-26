import { RECEIVE_PROJECTS,
         RECEIVE_PROJECT,
         REMOVE_PROJECT } from '../actions/project_actions';
import { RECEIVE_TASKS,
        RECEIVE_TASK,
        REMOVE_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';
import uniq from 'lodash/uniq';

const ProjectsReducer = (state = {}, action) => {
  // console.log(action.type);
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return merge({}, state, action.projects);
    case RECEIVE_PROJECT:
      return merge({}, state, { [action.project.id]: action.project });
    case REMOVE_PROJECT:
      newState = merge({}, state);
      delete newState[action.projectId];
      return newState;
    case RECEIVE_TASK:
      if (state[action.task.projectId]) {
        newState = merge({}, state);
        const newTaskIds = newState[action.task.projectId].taskIds.concat([action.task.id]);
        newState[action.task.projectId].taskIds = uniq(newTaskIds);
        return newState;
      }
      return merge({}, state);
    default:
      return merge({}, state);
  }
};

export default ProjectsReducer;
