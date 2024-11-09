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
          fontSize: '40px',
          color: '#fff',
          textAlign: 'center',
        }}
      >
      {inputValue} will expire in ___ years !!
    </p>
    <button onClick={handleTryAgain} style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: 'white',
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
