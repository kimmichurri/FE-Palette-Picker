import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../thunks/fetchProjects';
import { storeColors } from '../../actions';

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

    return (
      <div className="App">
        <header className="App-header">
          <p>Here we are</p>
        </header>
        <div className="colors-wrapper">
          <div className="palette-color"></div>
          <div className="palette-color"></div>
          <div className="palette-color"></div>
          <div className="palette-color"></div>
          <div className="palette-color"></div>
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
