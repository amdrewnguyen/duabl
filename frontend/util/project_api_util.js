export const fetchProjects = () => (
  $.ajax(
    {
      url: '/api/projects',
      methods: 'get',
    }
  )
);

export const fetchProject = (projectId) => (
  $.ajax(
    {
      url: `/api/projects/${projectId}`,
      methods: 'get',
    }
  )
);

export const updateProject = (project) => (
  $.ajax(
    {
      url: `/api/projects/${project.id}`,
      methods: 'patch',
      data: { project },
    }
  )
);

export const createProject = (project) => (
  $.ajax(
    {
      url: `/api/projects/`,
      methods: 'post',
      data: { project },
    }
  )
);

export const deleteProject = (projectId) => (
  $.ajax(
    {
      url: `/api/projects/${projectId}`,
      methods: 'delete',
    }
  )
);
