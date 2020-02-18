import React from 'react'
import PropTypes from 'prop-types'

import MaterialTable from 'material-table';

function Table({data, onUpdateClick, onDeleteClick }) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'NOMBRE', field: 'firstname' },
      { title: 'APELLIDOS', field: 'lastname' },
      { title: 'EMAIL', field: 'email'},
      { title: 'CARGO', field: 'position'},
      { title: 'CENTRO DE TRABAJO', field: 'office'},
      { title: 'SALARIO', field: 'salary', type: 'numeric'},
      { title: 'HORAS SEMANALES', field: 'weeklyWorkHours', type: 'numeric' },
      
    ],
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={data}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Editar',
          onClick: (event, rowData) => onUpdateClick(rowData._id)
        },
        {
          icon: 'delete',
          tooltip: 'Eliminar',
          onClick: (event, rowData) => onDeleteClick(rowData)
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        search: false,
        pageSize: 10,
      }}
    />
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onUpdateClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Table;
