import React from 'react'
import PropTypes from 'prop-types'

const Link = ({type, onClick }) => (
    <button
       onClick={onClick}
       style={{
           marginLeft: '4px',
       }}
    >
      {type}
    </button>
)

Link.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link
