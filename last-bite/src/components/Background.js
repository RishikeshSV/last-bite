import React from 'react';
import LastBiteForText from '../images/page2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Background = ({scrollToLanding}) => {
  return (
    <>

    <div
      style={{
        backgroundImage: `url(${LastBiteForText})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'relative', // This ensures the arrow is positioned at the bottom
      }}
    > 
            <div
        onClick={scrollToLanding} // Trigger the scroll on click
        style={{
          position: 'absolute',
          top: '20px', // Position the arrow at the bottom
          left:'50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          fontSize: '30px',
          color: '#fff', // Change arrow color if needed
          backgroundColor: '#7d5241',
          borderRadius: '50%',
          padding: '10px 15px'
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </div>
      <div
        onClick={scrollToLanding} // Trigger the scroll on click
        style={{
          position: 'absolute',
          bottom: '20px', // Position the arrow at the bottom
          left:'50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          fontSize: '30px',
          color: '#fff', // Change arrow color if needed
          backgroundColor: '#7d5241',
          borderRadius: '50%',
          padding: '10px 15px'
        }}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
    </div>
    </>
  );
};

export default Background;
