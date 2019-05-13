import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../thunks/fetchProjects';
import { storeColors } from '../../actions';
import closeButton from '../../assets/closeButton.png';
import emptyStar from '../../assets/emptyStar.png';
import filledStar from '../../assets/filledStar.png';
import generate from '../../assets/generate.png';

export class App extends Component {

  componentDidMount() {
    const url = `https://palette-picker-mfjk.herokuapp.com/api/v1/projects`
    this.props.fetchProjects(url)
    this.generateRandomColor()
  }

  generateRandomColor = () => {
    let randomColors = []
    for (let i = 0; i < 5; i++ ) {
      const randomColor = Math.floor(Math.random()*16777215).toString(16)
      randomColors.push(`#${randomColor}`)
    }
    this.props.storeColors(randomColors)
  }

  render() {
    const { currentColors } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <h1>Palette Picker</h1>
        </header>
        <h2>Generate New Palette
          <button>
            <img src={generate} alt={'Generate New Palette icon'}/>
          </button>
        </h2>
        <div className="colors-wrapper">
          <div className="palette-color" style={{ backgroundColor: currentColors[0] }}>
            <h3>{currentColors[0]}</h3>
            <button>
              <img className="star-icon" src={emptyStar} alt={'not saved icon'}/>
            </button>
          </div>
          <div className="palette-color" style={{ backgroundColor: currentColors[1] }}>
            <h3>{currentColors[1]}</h3>
            <button>
              <img className="star-icon" src={emptyStar} alt={'not saved icon'}/>
            </button>
          </div>
          <div className="palette-color" style={{ backgroundColor: currentColors[2] }}>
            <h3>{currentColors[2]}</h3>
            <button>
              <img className="star-icon" src={emptyStar} alt={'not saved icon'}/>
            </button>
          </div>
          <div className="palette-color" style={{ backgroundColor: currentColors[3] }}>
            <h3>{currentColors[3]}</h3>
            <button>
              <img className="star-icon" src={emptyStar} alt={'not saved icon'}/>
            </button>
          </div>
          <div className="palette-color" style={{ backgroundColor: currentColors[4] }}>
            <h3>{currentColors[4]}</h3>
            <button>
              <img className="star-icon" src={emptyStar} alt={'not saved icon'}/>
            </button>
            </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  error: state.error,
  projects: state.projects,
  currentColors: state.currentColors
})

export const mapDispatchToProps = (dispatch) => ({
  fetchProjects: (url) => dispatch(fetchProjects(url)),
  storeColors: (colors) => dispatch(storeColors(colors))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
