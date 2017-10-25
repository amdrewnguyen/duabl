export const fetchTasks = () => (
  $.ajax(
    {
      url: 'api/tasks',
      method: 'get',
    }
  )
);

export const fetchTask = (taskId) => (
  $.ajax(
    {
      url: `api/tasks/${taskId}`,
      method: 'get',
    }
  )
);

export const createTask = (task) => (
  $.ajax(
    {
      url: 'api/tasks',
      method: 'post',
      data: { task },
    }
  )
);

export const updateTask = (task) => (
  $.ajax(
    {
      url: `api/tasks/${task.id}`,
      method: 'patch',
      data: { task },
    }
  )
);

export const deleteTask = (taskId) => (
  $.ajax(
    {
      url: `api/tasks/${taskId}`,
      method: 'delete',
    }
  )
);
