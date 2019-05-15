import { hasError } from '../actions';
import { fetchOptionsCreator } from '../utils/fetchOptionsCreator';

export const deletePalette = (id) => {
  return async (dispatch) => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL
    const url = `${baseUrl}/api/v1/palettes/${id}`
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