import { connect } from 'react-redux'
import { deleteEmploye } from '../actions/api';
import Table from '../components/Table'
import { history } from '../store';
import { bindActionCreators } from 'redux'


export const redirectToUpdateEmploye = id => {
  history.push('/employe/'+id)
}

const mapStateToProps = state => ({
  onUpdateClick: id => redirectToUpdateEmploye(id),
})

const mapDispatchToProps = dispatch => ({
    onDeleteClick: employe => dispatch(bindActionCreators(deleteEmploye(employe), dispatch)),
})

const EmployeTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)

export default EmployeTable
