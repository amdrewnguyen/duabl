export const fetchProjects = () => (
  $.ajax(
    {
      url: '/api/projects',
      method: 'get',
    }
  )
);

export const fetchProject = (projectId) => (
  $.ajax(
    {
      url: `/api/projects/${projectId}`,
      method: 'get',
    }
  )
);

export const updateProject = (project) => (
  $.ajax(
    {
      url: `/api/projects/${project.id}`,
      method: 'patch',
      data: { project },
    }
  )
);

export const createProject = (project) => (
  $.ajax(
    {
      url: `/api/projects/`,
      method: 'post',
      data: { project },
    }
  )
);

export const deleteProject = (projectId) => (
  $.ajax(
    {
      url: `/api/projects/${projectId}`,
      method: 'delete',
    }
  )
);
