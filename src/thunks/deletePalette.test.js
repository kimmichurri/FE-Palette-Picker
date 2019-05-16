import { deletePalette } from './deletePalette';
import { hasError, setMessage } from '../actions';

describe('deletePalette', () => {
  let mockPalette 
  let mockDispatch
  let mockMessage

  beforeEach(() => {
    mockMessage = 'Deleted palette with id 68'
    mockPalette = {
      palette_name: "one",
      palette_id: 68,
      project_id: 1,
      color_1: "#605976",
      color_2: "#3241f2",
      color_3: "#dc677",
      color_4: "#1c1eb5",
      color_5: "#c54e8b"
    }
    mockDispatch = jest.fn()
  })

  it('should dispatch setMessage if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockMessage)
    }));

    const thunk = await deletePalette(mockPalette.palette_id)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setMessage('Deleted palette with id 68'))
  })

  it('should dispatch hasError if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }));

    const thunk = await deletePalette(mockPalette.palette_id)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong'))
  })
})