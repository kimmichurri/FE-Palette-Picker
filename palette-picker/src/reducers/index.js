import { combineReducers } from 'redux';
import { errorReducer } from './errorReducer';
import { projectsReducer } from './projectsReducer';
import { colorsReducer } from './colorsReducer';

export const rootReducer = combineReducers({
  error: errorReducer,
  projects: projectsReducer,
  currentColors: colorsReducer
});