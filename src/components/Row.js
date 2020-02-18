import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'
import ActionCell from './ActionCell'

const Row = ({ employe, onUpdateClick, onDeleteClick}) => (
  <tr>
      <Cell value={employe.firstname} />
      <Cell value={employe.lastname} />
      <Cell value={employe.email} />
      <Cell value={employe.position} />
      <Cell value={employe.office} />
      <Cell value={employe.salary} />
      <Cell value={employe.weeklyWorkHours} />
      <ActionCell actions={[{type:'update', onClick: onUpdateClick}, {type:'delete', onClick: onDeleteClick}]} />      
  </tr>
)

Row.propTypes = {
  employe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    weeklyWorkHours: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  updateEmploye: PropTypes.func,
  deleteEmploye: PropTypes.func,
};

export default Row

