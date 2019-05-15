import { fetchPalettes } from './fetchPalettes';
import { hasError, storePalettes } from '../actions';

describe('fetchPalettes', () => {
  let mockUrl
  let mockDispatch
  let mockPalettes

  beforeEach(() => {
    mockUrl = "www.palettes.com"
    mockDispatch = jest.fn()
    mockPalettes = [
      {
          palette_name: "one",
          palette_id: 68,
          project_id: 1,
          color_1: "#605976",
          color_2: "#3241f2",
          color_3: "#dc677",
          color_4: "#1c1eb5",
          color_5: "#c54e8b"
      },
      {
        palette_name: "two",
        palette_id: 68,
        project_id: 1,
        color_1: "#c54e8b",
        color_2: "#3241f2",
        color_3: "#dc677",
        color_4: "#1c1eb5",
        color_5: "#605976"
      }]
  })

  it('should dispatch storePalettes if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: true,
      json: () => Promise.resolve(mockPalettes)
    }))

    const thunk = await fetchPalettes(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(storePalettes(mockPalettes))
  })

  it('should dispatch hasError if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: false,
      statusText: 'Something went wrong'
    }))

    const thunk = await fetchPalettes(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong'))
  })
})