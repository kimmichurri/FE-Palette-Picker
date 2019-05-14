import React, { Component } from 'react';
import { connect } from 'react-redux';
import Color from '../Color/Color';
import { storeColors } from '../../actions';

export class Palette extends Component {

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
      <div>
        {colorSwatches}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentColors: state.currentColors
})

export const mapDispatchToProps = (dispatch) => ({
  storeColors: (colors) => dispatch(storeColors(colors))
})

export default connect(mapStateToProps, mapDispatchToProps)(Palette);