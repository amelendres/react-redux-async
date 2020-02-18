import React, { Component } from 'react'
import { connect } from 'react-redux'
//import EmployeListBox from './EmployeListBox'
import EmployeTable from './EmployeTable'
import { bindActionCreators } from 'redux'
import {fetchEmployes} from '../actions/api'
import { history } from '../store';

import Button from '@material-ui/core/Button';


class Home extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  editor(){
    return history.push('/employe')
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading ... </div>;
    }

    return (
            <div>
                <Button 
                onClick={() => this.editor()}
                variant="contained" 
                color="primary">
                  NUEVO
                </Button>
                <br/><br/>

                {/* <EmployeListBox /> */}
                <EmployeTable data={this.props.employes}/>
            </div>          
    )
  }
}
const mapStateToProps = state => ({
    appName: state.app.appName,
    employes: state.workman.employes,
    isLoading: state.workman.isLoading
})

const mapDispatchToProps = dispatch => ({
  onLoad: bindActionCreators(fetchEmployes, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)