import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComicsModel from './models/ComicsModel'

import { DefaultRoutes, AuthRoutes } from './config/routes';
import Navbar from './components/Navbar/navBar';
import * as actions from './store/actions/index';
import './App.css';

class App extends Component {
  state = {
    comics: [],
    characters: [],
    isOpen: false
  }

  componentDidMount() {
    this.props.onTryAutoSignUp()
    this.fetchData()
  }

  fetchData = () => {
    ComicsModel.all().then(data => {
      this.setState({
        characters: data.data.results
      })
    })

    ComicsModel.allComics().then(data => {
      this.setState({ comics: data.data.results })
    })
  }

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    let routes = (<DefaultRoutes characters={this.state.characters} comics={this.state.comics} />)

    if (this.props.isAuthenticated) {
      routes = <AuthRoutes characters={this.state.characters} comics={this.state.comics} />
    }

    return (
      <div className="App">
        <Navbar isAuthenticated={this.props.isAuthenticated} toggle={this.toggleNavbar} isOpen={this.state.isOpen}/>
        {routes}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
