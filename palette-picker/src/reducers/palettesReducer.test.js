import { palettesReducer } from "./palettesReducer";
import * as actions from '../actions';

describe('palettesReducer', () => {
  let mockState = []

  it('should return default state', () => {
    const action = {}

    const result = palettesReducer(mockState, action)

    expect(result).toEqual(mockState)
  })

  it('should return state with all palettes', () => {
    const mockPalettes = [{
      palette_name: "faefae",
      palette_id: 68,
      project_id: 1,
      color_1: "#605976",
      color_2: "#3241f2",
      color_3: "#dc677",
      color_4: "#1c1eb5",
      color_5: "#c54e8b"
    },
    {
      palette_name: "faefae",
      palette_id: 68,
      project_id: 1,
      color_1: "#605976",
      color_2: "#3241f2",
      color_3: "#dc677",
      color_4: "#1c1eb5",
      color_5: "#c54e8b"
    }]
    const action = actions.storePalettes(mockPalettes)

    const result = palettesReducer(mockState, action)

    expect(result).toEqual(mockPalettes)
  })

  it('should return state with a new palette', () => {
    const mockPalette = {
      palette_name: "faefae",
      palette_id: 68,
      project_id: 1,
      color_1: "#605976",
      color_2: "#3241f2",
      color_3: "#dc677",
      color_4: "#1c1eb5",
      color_5: "#c54e8b"
    }
    const action = actions.addPalette(mockPalette)

    const result = palettesReducer(mockState, action)

    expect(result).toEqual([mockPalette])
  })
})