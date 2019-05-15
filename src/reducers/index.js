import { combineReducers } from 'redux';
import { errorReducer } from './errorReducer';
import { projectsReducer } from './projectsReducer';
import { colorsReducer } from './colorsReducer';
import { palettesReducer } from './palettesReducer';

export const rootReducer = combineReducers({
  error: errorReducer,
  projects: projectsReducer,
  currentColors: colorsReducer,
  palettes: palettesReducer
});