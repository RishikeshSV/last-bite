import React, { useState } from 'react';
import SlidingInput from './SlidingInput';
import DisplayOutput from './DisplayOutput';
import Background from './Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Home = React.forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [showOutputPage, setShowOutputPage] = useState(false);
  const {scrollToLanding} = props

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleEnterPress = () => {
    setShowOutputPage(true);
  };

  const handleTryAgain = () => {
    setShowOutputPage(false);
  }

  return (
    <div ref={ref}>
        <Background scrollToLanding={scrollToLanding}/>
    <div>
      {showOutputPage ? (
        <div>
        <DisplayOutput inputValue={inputValue} handleTryAgain={handleTryAgain}/>
                </div>
      ) : (
        <SlidingInput handleInputChange={handleInputChange} handleEnterPress={handleEnterPress} />
      )}
    </div>
   
    </div>
  );
});

export default Home;
