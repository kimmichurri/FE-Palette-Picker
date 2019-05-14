import { colorsReducer } from './colorsReducer';
import * as actions from '../actions';

describe('colorsReducer', () => {
  const mockState = []
  
  it('should return state by default', () => {
    const action = {}

    const result = colorsReducer(mockState, action)

    expect(result).toEqual(mockState)
  })

  it('should return state as an array of colors', () => {
    const mockColors = [
      { color: '#37761B', locked: false }, { color: '#990000', locked: false }
    ]
    const action = actions.storeColors(mockColors)

    const result = colorsReducer(mockState, action)

    expect(result).toEqual(mockColors)
  })
})