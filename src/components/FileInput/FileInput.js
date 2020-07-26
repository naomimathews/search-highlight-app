import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types';
import './FileInput.css'

import MessagePopup from '../MessagePopup/MessagePopup'

function FileInput (props) {
  const { fileSelectCallback, fileExtension, buttonText='Select file' } = props
  const [hasError, setHasError] = useState(false)
  const fileInputRef = useRef()
  
  const handleFileSelect = (event) => {
    const fileObj = event.target.files[0]
    if (fileObj) {
      const isFileValid = validateFile(fileObj)
      if (isFileValid) {
        fileSelectCallback(fileObj)
      } else {
        setHasError(true)
      }
    }

    // to trigger onChange when same file is selected repeatedly
    event.target.value = ''
  }

  const validateFile = (file) => {
    if (fileExtension) {
      const fileExtRegex = new RegExp(`^.+${fileExtension}$`, 'i')
      return fileExtRegex.test(file.name)
    } 
    return true
  }

  const clearError = () => {
    setHasError(false)
  }

  const handleTriggerClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className='file-input-container'>

      {/* Simple button to open file explorer for selection */}
      <input 
        className='file-input' 
        type='file' 
        accept={fileExtension} 
        onChange={handleFileSelect}
        ref={fileInputRef}
      />
      <button 
        onClick={handleTriggerClick}
        className='file-input-trigger gradient-button'>
          {buttonText}
      </button>

      {/* Popup to show error when file type is not correct */}
      {
        hasError && <MessagePopup 
          message={`Selected file was not a valid ${fileExtension} file`}
          confirmCallback={clearError}/>
      }

    </div>
  )
}

FileInput.propTypes = {
  fileSelectCallback: PropTypes.func.isRequired,
  fileExtension: PropTypes.string,
  buttonText: PropTypes.string
}

export default FileInput