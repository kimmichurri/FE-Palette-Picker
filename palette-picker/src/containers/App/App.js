import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../thunks/fetchProjects';
import { fetchPalettes } from '../../thunks/fetchPalettes';
import { storeColors } from '../../actions';
import Palette from '../Palette/Palette';
import Projects from '../Projects/Projects';

export class App extends Component {

  componentDidMount() {
    this.props.fetchProjects()
    this.props.fetchPalettes()
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
  fetchProjects: () => dispatch(fetchProjects()),
  storeColors: (colors) => dispatch(storeColors(colors)),
  fetchPalettes: () => dispatch(fetchPalettes())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)