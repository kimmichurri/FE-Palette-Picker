import React, { Component } from 'react';
import emptyStar from '../../assets/emptyStar.png';
import filledStar from '../../assets/filledStar.png';
import { connect } from 'react-redux';
import { toggleLocked } from '../../actions';

export default class Color extends Component {

  render() {
    const { color, locked, index } = this.props
    return(
      <div className="palette-color" style={{ backgroundColor: color }}>
        <h3>{color}</h3>
        <button onClick={this.props.handleToggle} >
          <img className="star-icon" id={index} src={emptyStar} alt={'not saved icon'}/>
        </button>
      </div>
    )
  }
}