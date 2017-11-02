export const getSubtasks = (tasks, taskId) => {
  return tasks[taskId].subtaskIds.map((subtaskId) => (
    tasks[subtaskId]
  ));
};

export const getProjectTasks = (projects, tasks, projectId) => {
  let projTasks = [];
  if (projectId && projects) {
    let project = projects[projectId];
    if (project) {
      project.taskIds.forEach(
        (taskId) => {
          let task = tasks[taskId];
          if (task && !task.parentId) {
            projTasks.push(task);
          }
        }
      );
    }
  } else {
    return null;
  }
  return projTasks;
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

export const selectTaskTeamMembers = (entities, task) => {
  const members = [];
  if (task) {
    let memberIds = entities.teams[task.teamId].memberIds;
    memberIds.forEach((userId) => {
      let user = entities.users[userId];
      if (user) {
        members.push(Object.assign({}, user));
      }
    });
  }
  return members;
};

export const selectAssignee = (entities, task) => {
  if (task) {
    return entities.users[task.assigneeId];
  }
  return null;
};
