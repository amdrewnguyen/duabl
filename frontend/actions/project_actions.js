import * as ProjectAPI from '../util/project_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';

export const receiveProjects = (projects) => (
  {
    type: RECEIVE_PROJECTS,
    projects,
  }
);

export const receiveProject = (project) => (
  {
    type: RECEIVE_PROJECT,
    project,
  }
);

export const removeProject = (project) => (
  {
    type: RECEIVE_PROJECT,
    projectId: project.id,
  }
);

export const receiveProjectErrors = (errors) => (
  {
    type: RECEIVE_PROJECT_ERRORS,
    errors,
  }
);

export const fetchProjects = () => dispatch => {
  console.log("i've received the dispatch");
  return ProjectAPI.fetchProjects()
    .then(
      (projects) => dispatch(receiveProjects(projects)),
      (errors) => dispatch(receiveProjectErrors(errors))
    );
};

export const fetchProject = (projectId) => dispatch => (
  ProjectAPI.fetchProject(projectId)
    .then(
      (project) => dispatch(receiveProject(project)),
      (errors) => dispatch(receiveProjectErrors(errors))
    )
);

export const createProject = (project) => dispatch => (
  ProjectAPI.createProject(project)
    .then(
      (newProject) => dispatch(receiveProject(newProject)),
      (errors) => dispatch(receiveProjectErrors(errors))
    )
);

export const updateProject = (project) => dispatch => (
  ProjectAPI.updateProject(project)
    .then(
      (newProject) => dispatch(receiveProject(newProject)),
      (errors) => dispatch(receiveProjectErrors(errors))
    )
);

export const deleteProject = (projectId) => dispatch => (
  ProjectAPI.deleteProject(projectId)
    .then(
      (project) => dispatch(removeProject(project)),
      (errors) => dispatch(receiveProjectErrors(errors))
    )
);
