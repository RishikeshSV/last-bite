import anime from 'animejs';
import React, { useEffect, useRef } from 'react';

const DisplayOutput = ({ inputValue, handleTryAgain }) => {
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

  return (
    <>
     <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '150%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        padding: '20px',
        backgroundColor: 'transparent',
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
          fontSize: '40px',
          color: '#000',
          textAlign: 'center',
        }}
      >
      {inputValue.charAt(0).toUpperCase() + inputValue.slice(1)} will expire in ___ years !!
    </p>
    <button onClick={handleTryAgain} style={{
        cursor: 'pointer',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#FDE5CD',
        borderRadius: '4px',
        border: 'none',
        fontSize: '20px'
    }}>
        Try with another dish
    </button>
    </div>
      </>
  );
};

export default DisplayOutput;
