import React from "react";
import Background from "./Background";

const Ingredients =  React.forwardRef((props, ref) => {
    return(
    <div ref={ref}>
        <Background />
        Ingredients
    </div>
    );
})

export default Ingredients