import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const SlidingInput = ({ handleInputChange, handleEnterPress }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    anime({
      targets: containerRef.current,
      translateX: ['-100%', '0%'],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
    });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEnterPress();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        padding: '20px',
        backgroundColor: 'transparent',
        // backgroundImage: 'linear-gradient(to right, #F7C4F8 , #F8C4DF, #DEC4F8)',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        placeholder="Enter Text here"
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown} // Detect Enter key press
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          border: 'none',
          outline: 'none',
          textAlign: 'center',
          backgroundColor: 'transparent', // Make the background transparent
          fontSize: '16px', // Optional: set font size
        }}
      />
    </div>
  );
};

export default SlidingInput;
