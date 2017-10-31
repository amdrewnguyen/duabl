export const getSubtasks = (tasks, taskId) => {
  return tasks[taskId].subtaskIds.map((subtaskId) => (
    tasks[subtaskId]
  ));
};

export const getTasks = (tasks, project) => {
  let tasksProp = [];
  project.taskIds.forEach((taskId) => {
    if (tasks[taskId] && !tasks[taskId].parentId) {
      tasksProp.push(tasks[taskId]);
    }
  });
  return tasksProp;
};

export const getTeamProjects = (state, teamId) => {
  let teamProjects = [];
  let team = state.entities.teams[teamId];
  if (team) {
    team.projectIds.forEach((projectId) => {
      let projects = state.entities.projects.items;
      if (projects && projects[projectId]) {
        teamProjects.push(projects[projectId]);
      }
    });
  }
  return teamProjects;
};
