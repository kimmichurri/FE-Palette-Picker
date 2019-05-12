export const hasError = (message) => ({
  type: 'HAS_ERROR',
  message
})

export const storeProjects = (projects) => ({
  type: 'STORE_PROJECTS',
  projects
})