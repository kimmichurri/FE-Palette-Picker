import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storePalettes, storeProjects, setMessage } from '../../actions';
import closeButton from '../../assets/closeButton.png';
import { deletePalette } from '../../thunks/deletePalette';
import { deleteProject } from '../../thunks/deleteProject';
import { postNewPalette } from '../../thunks/postNewPalette';
import { postNewProject } from '../../thunks/postNewProject';
import { fetchOptionsCreator } from '../../utils/fetchOptionsCreator';
import PropTypes from 'prop-types';

export class Projects extends Component {
  constructor() {
    super();
    this.state = {
      project_name: '',
      project_id: 0,
      palette_name: '',
      color_1: '',
      color_2: '',
      color_3: '',
      color_4: '',
      color_5: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  
  addNewProject = async (e) => {
    e.preventDefault()
    const projectName = this.state.project_name
    const foundIndex = this.props.projects.findIndex(project => project.project_name === projectName)
    if (foundIndex === -1) {
      const body = { project_name: projectName }
      const options = await fetchOptionsCreator('POST', body)
      this.props.postNewProject(options, projectName)
      this.props.setMessage('')
    } else {
      this.props.setMessage('This project name is already taken. Please choose another name.')
    }
  }

  deletePalette = (e) => {
    const id = parseInt(e.target.id)
    const updatedPalettes = this.props.palettes.filter(palette => id !== palette.palette_id)
    this.props.storePalettes(updatedPalettes)
    this.props.deletePalette(id)
  }

  deleteProject = (e) => {
    const id = parseInt(e.target.id)
    const updatedProjects = this.props.projects.filter(project => id !== project.project_id)
    this.props.storeProjects(updatedProjects)
    this.props.deleteProject(id)
  }

  setPalette = async (e) => {
    e.preventDefault()
    await this.props.currentColors.forEach((color, index) => {
      let colorKey = `color_${index + 1}`
      this.setState({ [colorKey]: color.color })
    })
    this.addNewPalette()
  }
  
  addNewPalette = async () => {
    const { project_id, palette_name, color_1, color_2, color_3, color_4, color_5 } = this.state
    const body = {
      project_id,
      palette_name,
      color_1,
      color_2,
      color_3,
      color_4,
      color_5
    }
    const options = await fetchOptionsCreator('POST', body)
    this.props.postNewPalette(options, body)
  }

  render() {
    const projectList = this.props.projects.map((project, index) => {
      let projectName = project.project_name
      return <option key={`option-${projectName}-${index}`} value={project.project_id} >{projectName}</option>
    })
    const projectsToDisplay = this.props.projects.map((project, index) => {
      return <div className="individual-projects" key={`${project.project_name}-${index}`}>
        <h3 className="project-title">{project.project_name}</h3>
          <button onClick={this.deleteProject} >
            <img className="delete-project-button" src={closeButton} alt={'Delete Project icon'} id={project.project_id}/>
          </button>
        {
          this.props.palettes.map((palette, index) => {
            if (palette.project_id === project.project_id) {
              return <div className="project-palettes" key={`${palette.palette_name}-${index}`}>
                <div className="palette-header">
                  <h5>{palette.palette_name}</h5>
                    <button onClick={this.deletePalette}>
                      <img className="delete-palette-button" src={closeButton} alt={'Delete Palette icon'} id={palette.palette_id}/>
                    </button>
                </div>  
                <div className="palette-colors">
                  <div className="small-palette color_1" style={{ backgroundColor: palette.color_1 }}></div>
                  <div className="small-palette color_2" style={{ backgroundColor: palette.color_2 }}></div>
                  <div className="small-palette color_3" style={{ backgroundColor: palette.color_3 }}></div>
                  <div className="small-palette color_4" style={{ backgroundColor: palette.color_4 }}></div>
                  <div className="small-palette color_5" style={{ backgroundColor: palette.color_5 }}></div>
                </div>
              </div>
            }
          })
        }
      </div>
    })
    return(
      <div className="projects">
      <form onSubmit={this.addNewProject}>
        <input type="text" onChange={this.handleChange} value={this.state.project_name} name="project_name" />
        <button className="project-button">Add New Project</button>
        <div className="message-container">
        {this.props.message.length > 0 ? (
          <p className="user-message">{this.props.message}</p>) : (<p></p>
        )}
        </div>
      </form>
      <select value={this.state.project_id} name="project_id" onChange={this.handleChange}>
        <option value="0" disable="true" select="true" default>Select a Project</option>
        {projectList}
      </select>
      <form onSubmit={this.setPalette}>
        <input type="text" onChange={this.handleChange} value={this.state.palette_name} name="palette_name" />
        <button className="palette-button" disabled={this.state.project_id == 0}>Save Palette to Project</button>
      </form>
      <div className="projects-to-display">
        <p className="my-projects-title">my projects</p>
        {projectsToDisplay}
      </div>
      </div>
    )
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  palettes: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  postNewProject: PropTypes.func.isRequired,
  storePalettes: PropTypes.func.isRequired,
  deletePalette: PropTypes.func.isRequired,
  storeProjects: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  currentColors: PropTypes.array.isRequired,
  postNewPalette: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  projects: state.projects,
  palettes: state.palettes,
  currentColors: state.currentColors,
  message: state.message
})

export const mapDispatchToProps = (dispatch) => ({
  postNewProject: (url, body) => dispatch(postNewProject(url, body)),
  storePalettes: (updatedPalettes) => dispatch(storePalettes(updatedPalettes)),
  deletePalette: (id) => dispatch(deletePalette(id)),
  storeProjects: (updatedProjects) => dispatch(storeProjects(updatedProjects)),
  deleteProject: (id) => dispatch(deleteProject(id)),
  setMessage: (message) => dispatch(setMessage(message)),
  postNewPalette: (options, body) => dispatch(postNewPalette(options, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)