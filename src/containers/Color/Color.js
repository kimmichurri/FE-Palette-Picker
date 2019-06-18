import React, { Component } from 'react';
import emptyStar from '../../assets/emptyStar.png';
import filledStar from '../../assets/filledStar.png';
import PropTypes from 'prop-types';

export default class Color extends Component {

  render() {
    const { color, locked, index } = this.props
    return(
      <div className="palette-color" style={{ backgroundColor: color }}>
        <h3 className="indiv-color-text">{color}</h3>
        <button className="fave-button" onClick={this.props.handleToggle} >
          <img className="star-icon" id={index} src={locked ? filledStar : emptyStar} alt={'not saved icon'}/>
        </button>
      </div>
    )
  }
}

Color.propTypes = {
  color: PropTypes.string.isRequired,
  locked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
}