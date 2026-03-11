import React, { useState, useEffect } from 'react';
import '../../styles/navigation-message.css';

const NavigationMessage = ({ message, side }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [activeMessage, setActiveMessage] = useState(message);

  useEffect(() => {
    if (message) {
        setIsHiding(false);
        setActiveMessage(message);
        setIsTyping(true);
        setDisplayedText('');
        let currentIndex = 0;

        const typeInterval = setInterval(() => {
          if (currentIndex < message.length) {
            setDisplayedText(prev => prev + message[currentIndex]);
            currentIndex++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, 45);

        return () => clearInterval(typeInterval);
    } else if (activeMessage) {
        // Message was cleared, start hiding animation
        setIsHiding(true);
        const hideTimeout = setTimeout(() => {
            setActiveMessage(null);
            setIsHiding(false);
        }, 400); // Wait for the CSS animation to complete
        
        return () => clearTimeout(hideTimeout);
    }
  }, [message, activeMessage]);

  if (!activeMessage) return null;

  return (
    <div className={`nav-message-overlay ${isHiding ? 'hiding' : ''}`}>
      <div className="nav-message-content">
         <div className="nav-message-icon">
             {side === 'left' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                </svg>
             ) : side === 'right' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M19 12l-7 7M19 12l-7-7" />
                </svg>
             ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
             )}
         </div>
         <div className="nav-message-text-container">
            <span className="nav-message-text">{displayedText}</span>
            {isTyping && <span className="nav-message-cursor">|</span>}
         </div>
      </div>
    </div>
  );
};

export default NavigationMessage;
