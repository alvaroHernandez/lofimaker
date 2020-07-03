import React, {useState} from 'react'
import {CustomCheckboxContainer, CustomCheckboxInput} from '@reach/checkbox'
import PropTypes from 'prop-types'
import './Switch.css'

const Switch = props => {
  const [checkedState, setChecked] = useState(props.checked || false)
  const checked = props.checked != null ? props.checked : checkedState

  function toggleCheckedState(state) {
    setChecked(state)
    props.toggleHandler(state)
  }

  return (
    <label className="switch">
      <CustomCheckboxContainer
        checked={props.checked != null ? props.checked : checked}
        onChange={event => toggleCheckedState(event.target.checked)}
      >
        <CustomCheckboxInput {...props} />
        <span className="slider" />
      </CustomCheckboxContainer>
    </label>
  )
}

Switch.propTypes = {
  checked: PropTypes.bool,
  toggleHandler: PropTypes.any.isRequired,
}

export default Switch
