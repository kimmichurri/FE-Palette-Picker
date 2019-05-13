import React, { Component } from 'react';
import { connect } from 'react-redux';
import Color from '../Color/Color';

export class Palette extends Component {
  render() {
    const colorSwatches = this.props.currentColors.map(color => {
      return <Color key={color.color} {...color} />
    })
    return(
      <div>
        {colorSwatches}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentColors: state.currentColors
})

export default connect(mapStateToProps)(Palette);