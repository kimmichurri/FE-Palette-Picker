import { errorReducer } from './errorReducer';
import * as actions from '../actions';

describe('errorReducer', () => {
  const mockState = ""

  it('should have default state', () => {
    const action = {}

    const result = errorReducer(mockState, action)

    expect(result).toEqual(mockState)
  })

  it('should return state with an error message', () => {
    const message = 'Something went wrong'
    const action = actions.hasError(message)

    const result = errorReducer(mockState, action)

    expect(result).toEqual(message)
  })
})