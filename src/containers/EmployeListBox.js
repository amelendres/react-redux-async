import { connect } from 'react-redux'
import { deleteEmploye } from '../actions/api';
import EmployeList from '../components/EmployeList'
import { history } from '../store';
import { bindActionCreators } from 'redux'


export const redirectToUpdateEmploye = id => {
  history.push('/employe/'+id)
}

const mapStateToProps = state => ({
  employes: state.workman.employes,
  onUpdateClick: id => redirectToUpdateEmploye(id),
})

const mapDispatchToProps = dispatch => ({
    onDeleteClick: employe => dispatch(bindActionCreators(deleteEmploye(employe), dispatch)),
})

const EmployeListBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeList)

export default EmployeListBox
