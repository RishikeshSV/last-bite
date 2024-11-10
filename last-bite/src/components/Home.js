import React, { useState } from "react";
import SlidingInput from "./SlidingInput";
import DisplayOutput from "./DisplayOutput";
import Background from "./Background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Home = React.forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [showOutputPage, setShowOutputPage] = useState(false);
  const { scrollToLanding, scrollToIngredients, setData } = props;

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleEnterPress = () => {
    setShowOutputPage(true);
    getPrediction();
  };

  const handleTryAgain = () => {
    setShowOutputPage(false);
  };
  const [predictedYear, setPredictedYear] = useState(null);

  const getPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Specify the content type
        },
        body: `dish_name=${inputValue}`, // Send the dish name in the request body
      });

      const data = await response.json();
      setPredictedYear(data.predicted_year);
      setData(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <Background
        scrollToLanding={scrollToLanding}
        showOutputPage={showOutputPage}
        scrollToIngredients={scrollToIngredients}
      />
      <div>
        {showOutputPage ? (
          <div>
            <DisplayOutput
              inputValue={inputValue}
              handleTryAgain={handleTryAgain}
              scrollToIngredients={scrollToIngredients}
              predictedYear={predictedYear}
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
