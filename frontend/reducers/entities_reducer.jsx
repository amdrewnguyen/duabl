import { combineReducers } from 'redux';

import ProjectsReducer from './projects_reducer';
import TasksReducer from './tasks_reducer';
import TeamsReducer from './teams_reducer';
import UsersReducer from './users_reducer';

const EntitiesReducer = combineReducers({
  projects: ProjectsReducer,
  tasks: TasksReducer,
  teams: TeamsReducer,
  users: UsersReducer,
});

export default EntitiesReducer;
