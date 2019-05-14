import React, { Component } from 'react';
import { connect } from 'react-redux';
import Color from '../Color/Color';
import { storeColors } from '../../actions';
import generate from '../../assets/generate.png';
import { fetchOptionsCreator } from '../../utils/fetchOptionsCreator';
import { postNewPalette } from '../../thunks/postNewPalette';

export class Palette extends Component {
  constructor() {
    super();
    this.state = {
      palette_name: '',
      project_id: 0,
      color_1: '',
      color_2: '',
      color_3: '',
      color_4: '',
      color_5: ''
    }
  }
  
  updateColors = () => {
    const updatedColors = this.props.currentColors.map(color => {
      if (color.locked) {
        return color
      } else {
        const newColor = Math.floor(Math.random()*16777215).toString(16)
        return { color: `#${newColor}`, locked: false }
      }
    })
    this.props.storeColors(updatedColors)
  }

  handleToggle = (e) => {
    const colorId = parseInt(e.target.id)
    const updatedColors = this.props.currentColors.map((color, index) => {
      if (index === colorId) {
        return { color: color.color , locked: !color.locked }
      } else {
        return color
      }
    })
    this.props.storeColors(updatedColors)
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
    const body = this.state
    const options = await fetchOptionsCreator('POST', body)
    await this.props.postNewPalette(options, body)
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const colorSwatches = this.props.currentColors.map((color, index) => {
      return <Color key={color.color} {...color} index={index} handleToggle={this.handleToggle} />
    })
    const projectList = this.props.projects.map((project, index) => {
      let projectName = project.project_name
      return <option key={`option-${projectName}-${index}`} value={project.project_id} >{projectName}</option>
    })
    return(
      <div className="colors-wrapper">
        <h2>Generate New Palette
          <button onClick={this.updateColors}>
            <img src={generate} alt={'Generate New Palette icon'} />
          </button>
        </h2>
        <select value={this.state.project_id} name="project_id" onChange={this.handleChange}>
          <option value="0" disable selected default>Select a Project</option>
          {projectList}
        </select>
        <form onSubmit={this.setPalette}>
          <input type="text" onChange={this.handleChange} value={this.state.palette_name} name="palette_name" />
          <button className="palette-button" disabled={this.state.project_id == 0}>Save Palette to Project</button>
        </form>
        {colorSwatches}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentColors: state.currentColors,
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  storeColors: (colors) => dispatch(storeColors(colors)),
  postNewPalette: (options, body) => dispatch(postNewPalette(options, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Palette);