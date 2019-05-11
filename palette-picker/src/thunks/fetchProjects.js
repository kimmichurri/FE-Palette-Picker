import { hasError, storeProjects } from '../actions';

export const fetchProjects = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const projects = await response.json();
      dispatch(storeProjects(projects))
    } catch(error) {
      dispatch(hasError(error.message))
    }
  }
}

