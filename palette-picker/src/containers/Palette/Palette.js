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
      project_id: 1,
      color_1: '',
      color_2: '',
      color_3: '',
      color_4: '',
      color_5: ''
    }
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

  updatePaletteName = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
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

  render() {
    const colorSwatches = this.props.currentColors.map((color, index) => {
      return <Color key={color.color} {...color} index={index} handleToggle={this.handleToggle} />
    })
    return(
      <div className="colors-wrapper">
        <h2>Generate New Palette
          <button onClick={this.updateColors}>
            <img src={generate} alt={'Generate New Palette icon'} />
          </button>
        </h2>
        <form onSubmit={this.setPalette}>
          <input type="text" onChange={this.updatePaletteName} value={this.state.palette_name} name="palette_name" />
          <button className="palette-button">Save Palette to Project</button>
        </form>
        {colorSwatches}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentColors: state.currentColors
})

export const mapDispatchToProps = (dispatch) => ({
  storeColors: (colors) => dispatch(storeColors(colors)),
  postNewPalette: (options, body) => dispatch(postNewPalette(options, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Palette);