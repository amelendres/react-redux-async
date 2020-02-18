import React from 'react'
import PropTypes from 'prop-types'
import VisibleTodoList from '../containers/EmployListBox'

const MainSection = ({ todosCount, completedCount, actions }) =>
  (
    <section className="main">
      <EmployListBox />
    </section>
  )

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection;