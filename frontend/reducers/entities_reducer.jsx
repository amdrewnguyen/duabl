import { combineReducers } from 'redux';

import ProjectsReducer from './projects_reducer';
import TasksReducer from './tasks_reducer';

const EntitiesReducer = combineReducers({
  projects: ProjectsReducer,
  tasks: TasksReducer,
});

export default EntitiesReducer;
