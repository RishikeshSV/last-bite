import React from 'react';
import FoodBg from '../images/FoodIcons.jpg'; // Import the image
import LastBite from '../images/lastBite.jpg' // Import the image to display
import Home from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const LandingPage = React.forwardRef((props, ref) => {
    const {scrollToHome} = props

  return (
    <div
    ref={ref}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* Image element to use LastBite.jpg as the main image */}
      <img 
        src={LastBite} 
        alt="Food" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Ensures the image covers the entire div without distortion
        }}
      />
      
      <div
        onClick={scrollToHome} // Trigger the scroll on click
        style={{
          position: 'absolute',
          bottom: '20px', // Position the arrow at the bottom
          left: '50%',
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
  );
});

export default LandingPage;
