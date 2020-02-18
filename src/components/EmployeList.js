import React from 'react'
import PropTypes from 'prop-types'
import Row from './Row'

const EmployeList = ({ employes, onUpdateClick, onDeleteClick }) => (
    <table>
      <thead>
      <tr>
        <th>NOMBRE</th>
        <th>APELLIDOS</th>
        <th>EMAIL</th>
        <th>CARGO</th>
        <th>CENTRO DE TRABAJO</th>
        <th>SALARIO</th>
        <th>HORAS SEMANALES</th>
        <th>ACCIONES</th>
      </tr>
      </thead>

      <tbody>
      {employes.map(employe =>
        <Row 
        key={employe._id} employe={employe} 
          /*{...actions}*/
          onUpdateClick={() => onUpdateClick(employe._id)}
          onDeleteClick={() => onDeleteClick(employe)}
        />
      )}
      </tbody>
    </table>
)

EmployeList.propTypes = {
  employes: PropTypes.arrayOf(Row.propTypes.employe).isRequired,
  onUpdateClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default EmployeList;
