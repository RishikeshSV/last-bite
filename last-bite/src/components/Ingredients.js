import React, { useEffect, useState } from "react";
import Why from "../images/why.jpg";
import PexelsImageFetcher from "./ImageGenerator";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Ingredients = React.forwardRef((props, ref) => {
  const [noOfIngredients, setNoOfIngredients] = useState(0);
  const [alternateIngredient, setAlternateIngredients] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { data, scrollToFunFacts } = props;

  const PrettyText = styled.div`
    font-size: 1.5em;
    color: #4a4e69;
    font-weight: 600;
    text-align: center;
    margin: 20px;
    line-height: 1.5;
    font-family: "Arial", sans-serif;
    background-color: #f2e9e4;
    padding: 5px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
  `;

  const getIngredients = async (inputValue) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Specify the content type
        },
        body: `dish_name=${inputValue}`, // Send the dish name in the request body
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const getAlternateIngredient = async (mainIngredient, dish) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/replacement-ingredient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Specify the content type
          },
          body: `dish_name=${dish}&ingredient=${mainIngredient}`, // Send the dish name and ingredient in the request body

        }
      );

      const data = await response.json();
      setAlternateIngredients(data.replacementIngredient)
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  useEffect(() => {
    if (data) {
      getIngredients(data.dish);
      getAlternateIngredient(data.main_ingredient, data.dish);
    }
  });

  return (
    <div ref={ref}>
      {data && alternateIngredient ? (
        <>
          <div
            style={{
              backgroundImage: `url(${Why})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              width: "100%",
              position: "relative", // This ensures the arrow is positioned at the bottom
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", paddingTop: "10%", alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: "20px",
                    fontSize: "26px",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>The main ingredient is</div>{" "}
                  <PrettyText>{data.main_ingredient}</PrettyText>
                </div>
                <div style={{ display: "flex", justifyContent: "right", paddingRight: '60px'}}>
                  <PexelsImageFetcher keyword={data.main_ingredient} />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: "20px",
                    fontSize: "26px",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>Which can be replaced by</div>{" "}
                  <PrettyText>{alternateIngredient}</PrettyText>
                </div>
                <div style={{ display: "flex", justifyContent: "right", paddingRight: '60px' }}>
                  <PexelsImageFetcher keyword={alternateIngredient} />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "2%",
                justifyContent: "center",
                fontSize: "30px ",
              }}
            >
              It doesn't survive when
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: "20px",
                  fontSize: "24px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                  Temperature is{" "}
                </div>{" "}
                <PrettyText>{data.predicted_temperature} C</PrettyText>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: "20px",
                  fontSize: "24px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>Rainfall is </div>{" "}
                <PrettyText>{data.predicted_rainfall} mm/yr</PrettyText>
              </div>
            </div>
            <div
              onClick={scrollToFunFacts} // Trigger the scroll on click
              style={{
                position: "absolute",
                bottom: "20px", // Position the arrow at the bottom
                left: "50%",
                transform: "translateX(-50%)",
                cursor: "pointer",
                fontSize: "30px",
                color: "#fff", // Change arrow color if needed
                backgroundColor: "#7d5241",
                borderRadius: "50%",
                padding: "10px 15px",
              }}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

export default Ingredients;
