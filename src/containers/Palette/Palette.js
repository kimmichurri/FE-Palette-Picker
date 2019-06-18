import React, { Component } from 'react';
import { connect } from 'react-redux';
import Color from '../Color/Color';
import { storeColors } from '../../actions';
import generate from '../../assets/generate.png';
import PropTypes from 'prop-types';

export class Palette extends Component {
  
  updateColors = () => {
    const updatedColors = this.props.currentColors.map(color => {
      if (color.locked) {
        return color
      } else {
        const newColor = Math.random().toString(16).slice(2, 8).toUpperCase()
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

  render() {
    const colorSwatches = this.props.currentColors.map((color, index) => {
      return <Color key={color.color} {...color} index={index} handleToggle={this.handleToggle} />
    })
    return(
      <div className="colors-wrapper">
        <p className="generate-palette-text">generate new palette
          <button onClick={this.updateColors} >
            <img  className="generate-button" src={generate} alt={'Generate New Palette icon'} />
          </button>
        </p>
        <div className="color-swatches-wrapper">
          {colorSwatches}
        </div>
      </div>
    )
  }
}

Palette.propTypes = {
  currentColors: PropTypes.array.isRequired,
  storeColors: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  currentColors: state.currentColors,
})

export const mapDispatchToProps = (dispatch) => ({
  storeColors: (colors) => dispatch(storeColors(colors))
})

export default connect(mapStateToProps, mapDispatchToProps)(Palette);