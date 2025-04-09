'use client';
import { useEffect } from 'react';
import './FlashMessage.scss';

interface FlashMessageProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
  onContinue?: () => void;
}

export default function FlashMessage({
  message,
  type,
  onClose,
  onContinue,
}: FlashMessageProps) {
  useEffect(() => {
    if (type !== 'success') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose, type]);

  return (
    <div id="flash-message-container" className=''>
      {type === 'success' && (
        <div id="success-box">
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth happy"></div>
          </div>
          <div className="shadow scale"></div>
          <div className="message">
            <h1 className="alert">Success!</h1>
            <p>{message}</p>
          </div>
          <button className="button-box" onClick={onContinue}>
            <h1 className="green">Continue</h1>
          </button>
        </div>
      )}

      {type === 'error' && (
        <div id="error-box">
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face2">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth sad"></div>
          </div>
          <div className="shadow move"></div>
          <div className="message">
            <h1 className="alert">Error!</h1>
            <p>{message}</p>
          </div>
          <button className="button-box" onClick={onClose}>
            <h1 className="red">Close</h1>
          </button>
        </div>
      )}

      {type === 'warning' && (
        <div id="error-box" style={{ background: 'linear-gradient(to bottom left, #f4e28c 40%, #f4c542 100%)' }}>
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face2">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth sad" style={{ borderColor: '#e2b300 transparent transparent #e2b300' }}></div>
          </div>
          <div className="shadow move"></div>
          <div className="message">
            <h1 className="alert">Warning!</h1>
            <p>{message}</p>
          </div>
          <button className="button-box" onClick={onClose}>
            <h1 className="red">Dismiss</h1>
          </button>
        </div>
      )}
    </div>
  );
}
