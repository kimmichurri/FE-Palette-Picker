export const projectsReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_PROJECTS':
      return action.projects
    case 'ADD_PROJECT':
      return [...state, action.newProject]
    default:
      return state
  }
}