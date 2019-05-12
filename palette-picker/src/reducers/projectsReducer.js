export const projectsReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_PROJECTS':
      return action.projects
    default:
      return state
  }
}