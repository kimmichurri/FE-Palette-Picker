import { hasError, addPalette } from '../actions';

export const postNewPalette = (options, body) => {
  return async (dispatch) => {
    const url = `https://palette-picker-mfjk.herokuapp.com/api/v1/palettes`
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const result = await response.json()
      const newPalette = {
        palette_name: body.palette_name,
        palette_id: result.palette_id, 
        project_id: 1,
        color_1: body.color_1,
        color_2: body.color_2,
        color_3: body.color_3,
        color_4: body.color_4,
        color_5: body.color_5
      }
      dispatch(addPalette(newPalette))
    } catch(error) {
      dispatch(hasError(error.message))
    }
  }
}
