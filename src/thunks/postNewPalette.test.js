import { postNewPalette } from './postNewPalette';
import { hasError, addPalette } from '../actions';

describe('postNewPalette', () => {
  let mockUrl
  let mockDispatch
  let mockNewPalette

  beforeEach(() => {
    mockUrl = "www.yoshi.com"
    mockDispatch = jest.fn()
    mockNewPalette = {
      palette_name: "faefae",
      palette_id: 68,
      project_id: 1,
      color_1: "#605976",
      color_2: "#3241f2",
      color_3: "#dc677",
      color_4: "#1c1eb5",
      color_5: "#c54e8b"
    }
  })

  it('should dispatch addPalette if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: true,
      json: () => Promise.resolve({ palette_id: mockNewPalette.palette_id })
    }))

    const thunk = await postNewPalette(mockUrl, mockNewPalette)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(addPalette(mockNewPalette))
  })

  it('should dispatch hasError if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: false,
      statusText: 'Something went wrong'
    }))

    const thunk = await postNewPalette(mockUrl, mockNewPalette)


    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong'))
  })
})