import { hasError, storeProjects, isLoading } from '../actions';

export const fetchProjects = () => {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/projects`
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const projects = await response.json();
      dispatch(storeProjects(projects))
      dispatch(isLoading(false))
    } catch(error) {
      dispatch(hasError(error.message))
    }
  }
}

