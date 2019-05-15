import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOptionsCreator } from '../../utils/fetchOptionsCreator';
import { postNewProject } from '../../thunks/postNewProject';
import closeButton from '../../assets/closeButton.png';
import { storePalettes, storeProjects } from '../../actions';
import { deletePalette } from '../../thunks/deletePalette';
import { deleteProject } from '../../thunks/deleteProject';

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

  render() {
    const projectsToDisplay = this.props.projects.map((project, index) => {
      return <div className="individual-projects" key={`${project.project_name}-${index}`}>
        <h3>{project.project_name}</h3>
          <button onClick={this.deleteProject}>
            <img src={closeButton} alt={'Delete Project icon'} id={project.project_id}/>
          </button>
        {
          this.props.palettes.map((palette, index) => {
            console.log(palette)
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
        <input type="text" onChange={this.updateProjectName} value={this.state.project_name} name="project_name" />
        <button className="project-button">Add New Project</button>
      </form>
      <div className="projects-to-display">
        {projectsToDisplay}
      </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects,
  palettes: state.palettes
})

export const mapDispatchToProps = (dispatch) => ({
  postNewProject: (url, body) => dispatch(postNewProject(url, body)),
  storePalettes: (updatedPalettes) => dispatch(storePalettes(updatedPalettes)),
  deletePalette: (id) => dispatch(deletePalette(id)),
  storeProjects: (updatedProjects) => dispatch(storeProjects(updatedProjects)),
  deleteProject: (id) => dispatch(deleteProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)