
import React  from 'react';
import './dark-mode-toggle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const DarkModeToggle = ({onChange}) => {

  return(
    <div onChange={onChange} class="dark-mode-toggle">
      <input type="checkbox" class="checkbox" id="checkbox" />
      <label for="checkbox" class="label">
      <FontAwesomeIcon icon={faSun}/>
      <FontAwesomeIcon icon={faMoon} />
      <div class='ball' />
      </label>
    </div>
  )
}

export default DarkModeToggle;