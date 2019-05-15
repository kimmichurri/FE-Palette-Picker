import { hasError, storePalettes } from '../actions';

export const fetchPalettes = () => {
  return async (dispatch) => {
    const url = 'https://palette-picker-mfjk.herokuapp.com/api/v1/palettes'
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const palettes = await response.json();
      dispatch(storePalettes(palettes))
    } catch(error) {
      dispatch(hasError(error.message))
    }
  }
}

