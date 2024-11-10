import React, { useState } from "react";
import SlidingInput from "./SlidingInput";
import DisplayOutput from "./DisplayOutput";
import Background from "./Background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Home = React.forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [showOutputPage, setShowOutputPage] = useState(false);
  const { scrollToLanding } = props;

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleEnterPress = () => {
    setShowOutputPage(true);
    fetchIngredients();
  };

  const handleTryAgain = () => {
    setShowOutputPage(false);
  };
  const [ingredients, setIngredients] = useState(null);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_ingredient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type
        },
        body: `dish_name=${inputValue}`, // Send the dish name in the request body
      });

      const data = await response.text();
      setIngredients(data); // Assuming the response is JSON
      console.log("inge >>", ingredients);
      
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  return (
    <div ref={ref}>
      <Background scrollToLanding={scrollToLanding} />
      <div>
        {showOutputPage ? (
          <div>
            {ingredients}
            <DisplayOutput
              inputValue={inputValue}
              handleTryAgain={handleTryAgain}
            />
          </div>
        ) : (
          <SlidingInput
            handleInputChange={handleInputChange}
            handleEnterPress={handleEnterPress}
          />
        )}
      </div>
    </div>
  );
});

export default Home;
