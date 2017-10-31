export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
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

export const closeSidebar = () => (
  {
    type: CLOSE_SIDEBAR,
  }
);

export const openSidebar = (component, options) => (
  {
    type: OPEN_SIDEBAR,
  }
);

export const receivePath = ({projectId, taskId}) => (
  {
    type: RECEIVE_PATH,
    projectId,
    taskId,
  }
);
