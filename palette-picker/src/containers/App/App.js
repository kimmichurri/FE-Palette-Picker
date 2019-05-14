import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../thunks/fetchProjects';
import { storeColors } from '../../actions';
import Palette from '../Palette/Palette';
import Projects from '../Projects/Projects';

export class App extends Component {

  componentDidMount() {
    const url = `https://palette-picker-mfjk.herokuapp.com/api/v1/projects`
    this.props.fetchProjects(url)
    this.generateRandomColor()
  }

  generateRandomColor = () => {
    let randomColors = []
    for (let i = 0; i < 5; i++) {
      const randomColor = Math.floor(Math.random()*16777215).toString(16)
      randomColors.push({ color: `#${randomColor}`, locked: false })
    }
    this.props.storeColors(randomColors)
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

  render() {
    return (
      <div className="App">
        <div className="header-project-wrapper">
          <header className="app-header">
            <h1>Palette Picker</h1>
          </header>
          <div className="projects-wrapper">
            <Projects />
          </div>
        </div>
        <div className="palette-wrapper">
          <Palette />
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