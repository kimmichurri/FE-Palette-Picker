import React, { Component } from 'react';
import emptyStar from '../../assets/emptyStar.png';
import filledStar from '../../assets/filledStar.png';

export default class Color extends Component {
  render() {
    const { color, locked } = this.props
    return(
      <div className="palette-color" style={{ backgroundColor: color }}>
            <h3>{color}</h3>
            <button>
              <img className="star-icon" src={emptyStar} alt={'not saved icon'}/>
            </button>
          </div>
    )
  }
}