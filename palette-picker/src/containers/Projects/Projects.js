import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOptionsCreator } from '../../utils/fetchOptionsCreator';
import { postNewProject } from '../../thunks/postNewProject';

export class Projects extends Component {
  constructor() {
    super();
    this.state = {
      project_name: '',
      project_id: 0
    }
  }

  updateProjectName = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  
  addNewProject = async (e) => {
    e.preventDefault()
    const projectName = this.state.project_name
    const body = { project_name: projectName }
    const options = await fetchOptionsCreator('POST', body)
    this.props.postNewProject(options, projectName)
  }

  render() {
    const projectsToDisplay = this.props.projects.map(project => {
      return <h3>{project.project_name}</h3>
    })
    return(
      <div>
      <form onSubmit={this.addNewProject}>
        <input type="text" onChange={this.updateProjectName} value={this.state.project_name} name="project_name" />
        <button>Add New Project</button>
      </form>
      {projectsToDisplay}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  postNewProject: (url, body) => dispatch(postNewProject(url, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)