import { combineReducers } from 'redux';

import ProjectsReducer from './projects_reducer';

const EntitiesReducer = combineReducers({
  projects: ProjectsReducer,
});

export default EntitiesReducer;
