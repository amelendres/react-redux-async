import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'

const ActionCell = ({actions}) => (
  <td>  
      {actions.map(action => (
        <Link key={action.type} type={action.type} onClick={action.onClick} /> 
      ))}
  </td>
)
ActionCell.propTypes = {
  actions: PropTypes.arrayOf(Link).isRequired,
}

export default ActionCell
