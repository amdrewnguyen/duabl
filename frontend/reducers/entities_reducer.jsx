import { combineReducers } from 'redux';

import ProjectsReducer from './projects_reducer';
import TasksReducer from './tasks_reducer';
import TeamsReducer from './teams_reducer';

const EntitiesReducer = combineReducers({
  projects: ProjectsReducer,
  tasks: TasksReducer,
  teams: TeamsReducer,
});

export default EntitiesReducer;
