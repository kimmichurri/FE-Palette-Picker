import { hasError, addProject } from '../actions';

export const postNewProject = (body, projectName) => {
  return async (dispatch) => {
    const url = `https://palette-picker-mfjk.herokuapp.com/api/v1/projects`
    try {
      const response = await fetch(url, body)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const result = await response.json()
      const newProject = { 
        project_name: projectName,
        project_id: result.project_id 
      }
      dispatch(addProject(newProject))
    } catch(error) {
      dispatch(hasError(error.message))
    }
  }
}