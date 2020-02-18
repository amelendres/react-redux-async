import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

import {appLoad} from '../actions'
import EmployeEditor from './EmployeEditor'
import Home from './Home'

class App extends Component {
  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    this.props.onLoad(token);
  }

  render() {
    return (
            <div>
                <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/employe" component={EmployeEditor} />
                <Route path='/employe/:id' component={EmployeEditor} />
                </Switch>
            </div>
          
    )
  }
}

const mapStateToProps = state => {
  return {
    appLoaded: state.appLoaded,
    appName: state.appName,
    company: state.token
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (token) =>
    dispatch(appLoad)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)