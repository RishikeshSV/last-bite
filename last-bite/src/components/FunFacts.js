import React, { useEffect, useState } from "react";
import Fun from "../images/fun.jpg";
import PexelsImageFetcher from "./ImageGenerator";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const FunFacts = React.forwardRef((props, ref) => {
  const [funFacts, setFunFacts] = useState(null);
  const { data } = props;

  const PrettyText = styled.div`
    font-size: 1.5em;
    color: #4a4e69;
    font-weight: 600;
    text-align: center;
    // margin: 20px;
    line-height: 1.5;
    font-family: "Arial", sans-serif;
    background-color: #f2e9e4;
    padding: 5px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  `;

  const getFunFacts = async (dish_name) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-fun-fact", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Specify the content type
        },
        body: `dish_name=${dish_name}`, // Send the dish name in the request body
      });

      const data = await response.json();
      setFunFacts(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  useEffect(() => {
    if (data) {
      getFunFacts(data.dish);
    }
  }, [data]); // Dependency array to run the effect only when data.dish changes

  return (
    <div ref={ref}>
      {funFacts ? (
        <>
          <div
            style={{
              backgroundImage: `url(${Fun})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              width: "100%",
              position: "relative", // This ensures the arrow is positioned at the bottom
            }}
          >
            <div style={{paddingTop: '10%', paddingRight: '10%'}}>
            {Object.entries(funFacts).map(([key, value]) => (
              <div style={{ display: "flex", flexDirection: 'row', paddingLeft: '10%', alignItems:'center'}} key={key}>
                <div style={{display: 'flex', flexDirection:'column'}}>
                <PrettyText>{key.charAt(0).toUpperCase() + key.slice(1)}</PrettyText>
                  <PexelsImageFetcher keyword={key} />
                </div>
                <p style={{paddingLeft: '30px', fontSize: '36px'}}>{value}</p> {/* Rendering the value of each fact */}
              </div>
            ))}
          </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

export default FunFacts;
