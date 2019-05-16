import { isLoadingReducer } from './isLoadingReducer';
import * as actions from '../actions';

describe('isLoadingReducer', () => {
  const mockState = false

  it('should return state by default', () => {
    const action = {}

    const result = isLoadingReducer(mockState, action)

    expect(result).toEqual(mockState)
  })

  it('should return state with a boolean', () => {
    const boolean = true
    const action = actions.isLoading(true)

    const result = isLoadingReducer(mockState, action)

    expect(result).toEqual(boolean)
  })
})