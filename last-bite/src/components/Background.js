import React from 'react';
import FoodBg from '../images/FoodIcons.jpg'; // Import the image
import Home from './Home';

const Background = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${FoodBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
      }}
    >
      <Home />
    </div>
  );
};

export default Background;
