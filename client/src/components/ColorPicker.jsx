import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";

const ColorPicker = () => {
    const snap = useSnapshot(state);

    return (
        <div className="absolute left-full ml-5">
            <SketchPicker
                color={snap.color} // default color once opened
                disableAlpha // removes the alpha slider
                onChange={(color) => (state.color = color.hex)}
                presetColors={[
                    // edits the preset colors ( lower row of colors )
                    "#ccc",
                    "#EFBD4E",
                    "#8ec67e",
                    "#726DE8",
                    "#353934",
                    "#2CCCE4",
                    "#ff8a65",
                    "#7Ø98DA",
                    "#C19277",
                    "#FF96AD",
                ]}
            />
        </div>
    );
};

export default ColorPicker;
