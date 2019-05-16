import { hasError } from '../actions';
import { fetchOptionsCreator } from '../utils/fetchOptionsCreator';

export const deleteProject = (id) => {
  return async (dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/projects/${id}`
    try {
      const options = fetchOptionsCreator('DELETE')
      const response = await fetch(url, options)
      if (!response.ok) {
        throw Error (response.statusText)
      }
    } catch(error) {
      dispatch(hasError(error.message))
    }
  }
}
