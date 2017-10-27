export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const RECEIVE_PATH = 'RECEIVE_PATH';

export const closeModal = () => (
  {
    type: CLOSE_MODAL,
  }
);

export const openModal = (component, options) => (
  {
    type: OPEN_MODAL,
    component,
    options,
  }
);

export const receivePath = ({projectId, taskId}) => (
  {
    type: RECEIVE_PATH,
    projectId,
    taskId,
  }
);
