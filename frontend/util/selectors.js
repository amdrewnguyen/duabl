export const getSubtasks = (tasks, taskId) => {
  return tasks[taskId].subtaskIds.map((subtaskId) => (
    tasks[subtaskId]
  ));
};
