import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import ProjectErrorsReducer from './project_errors_reducer';
import TaskErrorsReducer from './task_errors_reducer';

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  project: ProjectErrorsReducer,
  task: TaskErrorsReducer,
});

export default ErrorsReducer;
