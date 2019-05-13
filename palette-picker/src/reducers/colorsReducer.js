export const colorsReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_COLORS':
      return action.colors
    default:
      return state
  }
}