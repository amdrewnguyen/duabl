import { RECEIVE_PROJECTS,
         RECEIVE_PROJECT,
         REMOVE_PROJECT,
         REQUEST_PROJECTS,
         REQUEST_PROJECT } from '../actions/project_actions';
import { RECEIVE_TASKS,
        RECEIVE_TASK,
        REMOVE_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';
import uniq from 'lodash/uniq';

const defaultState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
};

const ProjectsReducer = (state = defaultState, action) => {
  // console.log(action.type);
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_PROJECTS:
      let items = merge({}, action.projects);
      Object.keys(items).forEach((id) => {
        merge(items[id], {
          isFetching: false,
          didInvalidate: false,
        });
      });
      return merge({}, state, {
        isFetching: false,
        didInvalidate: false,
        items,
      });
    case RECEIVE_PROJECT:
      return merge({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: {
          [action.project.id]: action.project,
        },
      });
    case REMOVE_PROJECT:
      newState = merge({}, state);
      delete newState[action.projectId];
      return newState;
    case RECEIVE_TASK:
      if (state.items[action.task.projectId]) {
        newState = merge({}, state);
        const newTaskIds = newState.items[action.task.projectId].taskIds.concat([action.task.id]);
        newState.items[action.task.projectId].taskIds = uniq(newTaskIds);
        return newState;
      }
      return merge({}, state);
    case REQUEST_PROJECTS:
      return merge({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case REQUEST_PROJECT:
      return merge({}, state, {
        items: {
          [action.projectId]: {
            isFetching: true,
            didInvalidate: false,
          }
        }
      });
    default:
      return merge({}, state);
  }
};

export default ProjectsReducer;
