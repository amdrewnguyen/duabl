import { RECEIVE_PROJECTS,
         RECEIVE_PROJECT,
         REMOVE_PROJECT } from '../actions/project_actions';
import merge from 'lodash/merge';

const ProjectsReducer = (state = {}, action) => {
  console.log(action.type);
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
    default:
      return merge({}, state);
  }
};

export default ProjectsReducer;
