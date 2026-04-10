import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ text, className, delay = 0, speed = 0.05 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timeout;
    if (delay > 0) {
      timeout = setTimeout(() => {
        startTyping();
      }, delay * 1000);
    } else {
      startTyping();
    }

    function startTyping() {
      let currentText = '';
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          currentText += text[index];
          setDisplayedText(currentText);
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed * 1000);
      return () => clearInterval(interval);
    }

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayedText}
    </span>
  );
};

export default TypingText;
