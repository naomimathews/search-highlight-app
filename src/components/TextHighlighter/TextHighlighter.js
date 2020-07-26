import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types';
import './TextHighlighter.css'

// Utility functions
import { getAllMatchesForQuery, randomUniqueString } from '../../utils/stringUtils'
import { useDebounce } from '../../utils/customHooks'

function TextHighlighter (props) {
  const {text, search = '', className = '', title = '', } = props
  const [textChunks, setTextChunks] = useState([])
  const [matchCount, setMatchCount] = useState(0)
  const searchQuery = useDebounce(search, 300)

  const handleMatchesFound = useCallback((text, searchQuery, matches) => {

    // Split the text into chunks of text to be highlighted or not
    // For eg if 'name' was searched in 'My name is Jane'
    // the below logic splits the text to 'My' 'name' and 'is Jane'
    const tempTextChunks = [];
    let nextIndex = 0;
    for (let i = 0; i < matches.length; i++) {
      if (nextIndex < matches[i].index) {
        tempTextChunks.push({
          text: text.substring(nextIndex, matches[i].index),
          isHighlighted: false,
          key: randomUniqueString()
        })
      } 
      tempTextChunks.push({
        text: text.substring(matches[i].index, matches[i].index + searchQuery.length),
        isHighlighted: true,
        key: randomUniqueString()
      })
      nextIndex = matches[i].index + searchQuery.length
    }

    if(nextIndex < text.length - 1) {
      tempTextChunks.push({
        text: text.substring(nextIndex, text.length),
        isHighlighted: false,
        key: randomUniqueString()
      })
    }

    setTextChunks(tempTextChunks)
    setMatchCount(matches.length)
  }, [setTextChunks, setMatchCount])
  
  const handleMatchesNotFound = useCallback((text) => {
    setTextChunks([{
      text: text,
      isHighlighted: false,
      key: randomUniqueString()
    }])
    setMatchCount(0)
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const matches = getAllMatchesForQuery(text, searchQuery)
      debugger
      if (matches.length) {
        handleMatchesFound(text, searchQuery, matches)
      } else {
        handleMatchesNotFound(text)
      }
    } else {
      handleMatchesNotFound(text)
    }
  }, [text, searchQuery, handleMatchesNotFound, handleMatchesFound])

  return (<div className={`text-match-container  ${className}`}>

    <div className='highlighter-header'>
      <h2 className='highlighter-title'>{title}</h2>
      {searchQuery && 
        <span className='match-count'> 
          {matchCount === 0 ? 'No matches ' : (matchCount === 1) ? '1 match ' : `${matchCount} matches `}
          found
        </span>
      } 
    </div>

    {/* Loop over the generated text chunks and add highlight class to matched text */}
    <div className='text-container'>
      {textChunks.map((textChunk) => (
        <span 
          key={textChunk.key} 
          className={textChunk.isHighlighted ? 'highlighter' : ''}>
            {textChunk.text}
        </span>
      ))}
    </div>

  </div>)
}

export default TextHighlighter

TextHighlighter.propTypes = {
  text: PropTypes.string.isRequired,
  search: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string
}