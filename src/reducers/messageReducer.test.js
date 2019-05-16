import { messageReducer } from './messageReducer';
import * as actions from '../actions';

describe('messageReducer', () => {
  const mockState = ''

  it('should return state by default', () => {
    const action = {}

    const result = messageReducer(mockState, action)

    expect(result).toEqual(mockState)
  })

  it('should return state with a boolean', () => {
    const message = "Something went wrong"
    const action = actions.setMessage(message)

    const result = messageReducer(mockState, action)

    expect(result).toEqual(message)
  })
})