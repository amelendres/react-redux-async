import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({value}) => (
  <td> {value} </td>
)

Cell.propTypes = {
  value: PropTypes.string.isRequired
}

export default Cell
