import React from 'react'
import PropTypes from 'prop-types';
import './TextInput.css'

function TextInput (props) {
  const { value, changeCallback, className = '', placeholder = '' } = props

  const handleChange = (event) => {
    changeCallback(event.target.value)
  }

  return (
    <input 
      className={`text-input ${className}`} 
      type='text' onChange={handleChange} 
      value={value} 
      placeholder={placeholder}/>
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  changeCallback: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
}


export default TextInput