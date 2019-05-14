export const palettesReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_PALETTES':
      return action.palettes
    case 'ADD_PALETTE':
      console.log(action.newPalette)
      return [...state, action.newPalette]
    default:
      return state
  }
}