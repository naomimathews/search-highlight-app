import React, {useState} from 'react';
import './App.css';

// Child components
import FileInput from './components/FileInput/FileInput'
import TextInput from './components/TextInput/TextInput'
import TextHighlighter from './components/TextHighlighter/TextHighlighter'

// Utility functions
import { readFileAsText } from './utils/fileUtils'

function App() {
  const [file, setFile] = useState()
  const [textContent, setTextContent] = useState('')
  const [searchInputText, setSearchInputText] = useState('')

  const handleFileSelect = (fileObj) => {
    setFile(fileObj)
    readFileAsText(fileObj).then((text) => {
      setTextContent(text)
    })
  }

  const handleSearchChange = (text) => {
    setSearchInputText(text)
  }

  return (
    <div className='app-container'>

      {/* Page layout when no file is selected */}
      {!file && <div className='file-upload-container'>
        <h1 className='file-upload-msg'>Upload a .txt file to begin search</h1>
        <FileInput buttonText='Select File' fileSelectCallback={handleFileSelect} fileExtension='.txt'/>
      </div>}

      {/* Page layout when file is selected */}
      {file && <div className='search-text-container'>
        <div className='app-controls'>
          <TextInput className='search-input' placeholder='Search uploaded file contents' changeCallback={handleSearchChange} value={searchInputText}/>
          <FileInput buttonText='Change File' fileSelectCallback={handleFileSelect} fileExtension='.txt'/>
        </div>
        <TextHighlighter className='text-content' title={file.name} text={textContent} search={searchInputText} />
      </div>}
    </div>
  );
}

export default App;
