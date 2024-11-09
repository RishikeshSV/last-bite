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
        backgroundColor: '#4CAF50',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          margin: '0 0 10px 0',
          fontSize: '36px',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        What's your favorite dish ?
      </p>
      <input
        type="text"
        placeholder="Prepare to be amazed"
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown} // Detect Enter key press
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: 'none',
          outline: 'none',
          backgroundColor: '#4CAF50',
          textAlign: 'center'
        }}
      />
    </div>
  );
};

export default SlidingInput;
