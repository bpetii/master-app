
import React  from 'react';
import './dark-mode-toggle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const DarkModeToggle = ({onChange, checked = false}) => {

  return(
    <div className="dark-mode-toggle">
      <input onChange={onChange} type="checkbox" className="checkbox" id="checkbox" checked={checked}/>
      <label htmlFor="checkbox" className="label">
      <FontAwesomeIcon icon={faSun}/>
      <FontAwesomeIcon icon={faMoon} />
      <div className='ball' />
      </label>
    </div>
  )
}

export default DarkModeToggle;