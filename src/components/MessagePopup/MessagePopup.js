import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import './MessagePopup.css'

// These two containers are siblings in the DOM
const modalRoot = document.getElementById('modal-root');

class MessagePopup extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  handleActionClick = () => {
    if(this.props.confirmCallback) {
      this.props.confirmCallback()
    } 
  }

  render() {
    return ReactDOM.createPortal(
      <div className='modal-overlay'>
        <div className='modal-content-box'>
          <p className='popup-message'>{this.props.message}</p>
          <button 
            onClick={this.handleActionClick}
            className='gradient-button popup-close-button'>
              Ok
          </button>
        </div>
      </div>,
      this.el
    );
  }
}

MessagePopup.propTypes = {
  message: PropTypes.string.isRequired,
  confirmCallback: PropTypes.func.isRequired
}

export default MessagePopup