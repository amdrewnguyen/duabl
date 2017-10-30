export const getSubtasks = (state, taskId) => {
  return state.entities.tasks[taskId].subtaskIds.map((subtaskId) => (
    state.entities.tasks[subtaskId]
  ));
};
