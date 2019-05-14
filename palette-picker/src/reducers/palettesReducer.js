export const palettesReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_PALETTES':
      return action.palettes
    case 'ADD_PALETTE':
      return [...state, action.newPalette]
    default:
      return state
  }
}
