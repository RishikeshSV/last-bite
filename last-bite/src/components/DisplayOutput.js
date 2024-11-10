import anime from "animejs";
import React, { useEffect, useRef } from "react";

const DisplayOutput = ({ inputValue, handleTryAgain, scrollToIngredients, predictedYear }) => {
  const containerRef = useRef(null);
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    anime({
      targets: containerRef.current,
      translateX: ["-100%", "0%"],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
    });
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          padding: "20px",
          backgroundColor: "transparent",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            margin: "0 0 10px 0",
            fontSize: "40px",
            color: "#000",
            textAlign: "center",
          }}
        >
          {inputValue.charAt(0).toUpperCase() + inputValue.slice(1)} will go extinct in {predictedYear - currentYear} years !!
        </p>
        <div>
          <button
            onClick={scrollToIngredients}
            style={{
              cursor: "pointer",
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#FDE5CD",
              borderRadius: "4px",
              border: "none",
              fontSize: "20px",
            }}
          >
            Wanna know why ?
          </button>
          <div style={{
            textAlign: "center",
            marginTop: '15px',
            marginBottom: '15px'
          }}>OR</div>
          <button
            onClick={handleTryAgain}
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor: "#FDE5CD",
              borderRadius: "4px",
              border: "none",
              fontSize: "20px",
            }}
          >
            Try with another dish
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayOutput;
