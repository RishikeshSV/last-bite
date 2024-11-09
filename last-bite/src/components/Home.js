import React, { useState } from 'react';
import SlidingInput from './SlidingInput';
import DisplayOutput from './DisplayOutput';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [showOutputPage, setShowOutputPage] = useState(false);

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
    <div>
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
}

export default Home;
