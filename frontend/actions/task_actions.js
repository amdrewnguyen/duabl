import * as TaskAPI from '../util/task_api_util';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const REQUEST_TASKS = 'REQUEST_TASKS';
export const REQUEST_TASK = 'REQUEST_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const RECEIVE_TASK_ERRORS = 'RECEIVE_TASK_ERRORS';

export const receiveTasks = (tasks) => (
  {
    type: RECEIVE_TASKS,
    tasks,
  }
);

export const receiveTask = (task) => (
  {
    type: RECEIVE_TASK,
    task,
  }
);

export const requestTasks = () => (
  {
    type: REQUEST_TASKS,
  }
);

export const requestProjectTasks = (projectId) => (
  {
    type: REQUEST_TASKS,
    projectId,
  }
);

export const requestTask = (taskId) => (
  {
    type: REQUEST_TASK,
    taskId,
  }
);

export const removeTask = (task) => (
  {
    type: REMOVE_TASK,
    taskId: task.id,
    projectId: task.projectId,
  }
);

export const receiveTaskErrors = (errors) => (
  {
    type: RECEIVE_TASK_ERRORS,
    errors,
  }
);

export const fetchTasks = () => dispatch => {
  // dispatch(requestTasks());
  return TaskAPI.fetchTasks()
    .then(
      (tasks) => dispatch(receiveTasks(tasks)),
      (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
    );
};

export const fetchProjectTasks = (projectId) => dispatch => {
  dispatch(requestProjectTasks(projectId));
  return TaskAPI.fetchProjectTasks(projectId)
    .then(
      (tasks) => dispatch(receiveTasks(tasks)),
      (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
    );
};

export const fetchTask = (taskId) => dispatch => (
  TaskAPI.fetchTask(taskId)
    .then(
      (task) => dispatch(receiveTask(task)),
      (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
    )
);

export const createTask = (task) => dispatch => (
  TaskAPI.createTask(task)
    .then(
      (newTask) => dispatch(receiveTask(newTask)),
      (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
    )
);

export const updateTask = (task) => dispatch => (
  TaskAPI.updateTask(task)
    .then(
      (newTask) => dispatch(receiveTask(newTask)),
      (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
    )
);

export const deleteTask = (taskId) => dispatch => (
  TaskAPI.deleteTask(taskId)
    .then(
      (task) => dispatch(removeTask(task)),
      (errors) => dispatch(receiveTaskErrors(errors.responseJSON))
    )
);
