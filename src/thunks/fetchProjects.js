import { hasError, storeProjects } from '../actions';

export const fetchProjects = () => {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/projects`
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

