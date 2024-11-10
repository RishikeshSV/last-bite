import React, { useEffect, useState } from "react";
import IngredientsBackground from "./IngredientsBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Ingredients = React.forwardRef((props, ref) => {
    const [image, setImage] = useState(null)
  const getImage = async (prompt) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "<content-type>",
        "x-freepik-api-key": "FPSXcb802234c5cf4c1a85a680749d117169",
      },
      body: `{"prompt": ${prompt},"negative_prompt":"b&w, earth, cartoon, ugly","guidance_scale":2,"seed":42,"num_images":1,"image":{"size":"square_1_1"},"styling":{"style":"anime","color":"pastel","lightning":"warm","framing":"portrait"}}`,
    };

    fetch("https://api.freepik.com/v1/ai/text-to-image", options)
      .then((response) => {setImage(response.json()); console.log(image)})
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

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
      console.log("data >>>", data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  useEffect(() => {
    getIngredients('ramen');
    getImage('tomato')
  })

  return (
    <div ref={ref}>
      <IngredientsBackground />
      Ingredients
      <FontAwesomeIcon icon={["fas", "coffee"]} />
    </div>
  );
});

export default Ingredients;
