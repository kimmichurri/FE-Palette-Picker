import { combineReducers } from 'redux';
import { errorReducer } from './errorReducer';
import { projectsReducer } from './projectsReducer';

export const rootReducer = combineReducers({
  error: errorReducer,
  projects: projectsReducer
});