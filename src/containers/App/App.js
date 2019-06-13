import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../thunks/fetchProjects';
import { fetchPalettes } from '../../thunks/fetchPalettes';
import { storeColors } from '../../actions';
import Loader from '../../components/Loader/Loader';
import Palette from '../Palette/Palette';
import Projects from '../Projects/Projects';
import PropTypes from 'prop-types';

export class App extends Component {

  componentDidMount() {
    this.props.fetchProjects()
    this.props.fetchPalettes()
    this.generateRandomColor()
  }

  generateRandomColor = () => {
    let randomColors = []
    for (let i = 0; i < 5; i++) {
      const randomColor = Math.random().toString(16).slice(2, 8).toUpperCase()
      randomColors.push({ color: `#${randomColor}`, locked: false })
    }
    this.props.storeColors(randomColors)
  }

  render() {
    return (
      <div className="App">
        <div className="palette-wrapper">
          <header className="app-header">
            <h1 className="main-title">PALETTE PICKER</h1>
          </header>
          <Palette />
        </div>
        <div className="header-project-wrapper">
          <div className="projects-wrapper">
            {this.props.loading? 
             <Loader /> : <Projects />
            }
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  error: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  currentColors: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  fetchProjects: PropTypes.func.isRequired,
  storeColors: PropTypes.func.isRequired,
  fetchPalettes: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  error: state.error,
  projects: state.projects,
  currentColors: state.currentColors,
  loading: state.loading
})

export const mapDispatchToProps = (dispatch) => ({
  fetchProjects: () => dispatch(fetchProjects()),
  storeColors: (colors) => dispatch(storeColors(colors)),
  fetchPalettes: () => dispatch(fetchPalettes())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)