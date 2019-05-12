import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../thunks/fetchProjects';

export class App extends Component {

  componentDidMount() {
    const url = `https://palette-picker-mfjk.herokuapp.com/api/v1/projects`
    this.props.fetchProjects(url)
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <p>Here we are</p>
        </header>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  error: state.error,
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  fetchProjects: (url) => dispatch(fetchProjects(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
