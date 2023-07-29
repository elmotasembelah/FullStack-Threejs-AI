import { useSnapshot } from "valtio";

import state from "../store";
import { getContrastingColor } from "../config/helpers";

// eslint-disable-next-line react/prop-types
const CustomButton = ({ type, title, handleClick, customStyles }) => {
    let snap = useSnapshot(state);

    const generateStyle = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color), // insead of just white text, we get the contrasting color of the current theme and set the text color to that
            };
        } else if (type === "outline") {
            return {
                borderWidth: "1px",
                borderColor: snap.color,
                color: snap.color,
            };
        }
    };

    return (
        <button
            className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
            style={generateStyle(type)}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

export default CustomButton;

/* 
what did i learn

    if i declare dataVars for a component i can acces them in the component code 
    { type, title, handleClick, customStyles }

    i can customize the styling of a component according to that data using a function that return an object for a sryle prop

*/
