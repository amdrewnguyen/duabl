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

export const fetchProjects = () => dispatch => (
  ProjectAPI.fetchProjects()
    .then(
      (projects) => receiveProjects(projects),
      (errors) => receiveProjectErrors(errors)
    )
);

export const fetchProject = (projectId) => dispatch => (
  ProjectAPI.fetchProject(projectId)
    .then(
      (project) => receiveProject(project),
      (errors) => receiveProjectErrors(errors)
    )
);

export const createProject = (project) => dispatch => (
  ProjectAPI.createProject(project)
    .then(
      (newProject) => receiveProject(newProject),
      (errors) => receiveProjectErrors(errors)
    )
);

export const updateProject = (project) => dispatch => (
  ProjectAPI.updateProject(project)
    .then(
      (newProject) => receiveProject(newProject),
      (errors) => receiveProjectErrors(errors)
    )
);

export const deleteProject = (projectId) => dispatch => (
  ProjectAPI.deleteProject(projectId)
    .then(
      (project) => removeProject(project),
      (errors) => receiveProjectErrors(errors)
    )
);
