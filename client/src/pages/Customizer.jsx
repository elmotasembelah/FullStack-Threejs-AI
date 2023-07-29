import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

// import config from "../config/config";
import state from "../store";
// import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
    AiPicker,
    ColorPicker,
    FilePicker,
    Tab,
    CustomButton,
} from "../components";

const Customizer = () => {
    const snap = useSnapshot(state);

    // states to handle the file picker tab
    const [file, setFile] = useState("");

    // states to handle the ai picker tab
    const [prompt, setPrompt] = useState("");
    const [generatingImg, setGeneratingImg] = useState(false);

    // these states to dynamicly display each tab content as we press them
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    // type is either ( logoDecal or fullDecal )
    const readFile = (type) => {
        reader(file).then((res) => {
            handleDecals(type, res); // to set the res to the appropriate decal type
            setActiveEditorTab(""); // resetting the editrotabs so it shows nothing
        });
    };

    // set the res to the appropriate decal type
    const handleDecals = (type, res) => {
        const decalType = DecalTypes[type]; //logo or full

        // update the type ( full or logo ) img address to the new img
        state[decalType.stateProperty] = res;

        // activefilterTab is maid up of an object of two keys ( logo , full ) which house boolean
        // if the type of the upload is not matching the current type we switch them
        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    };

    // handles which filter type should be on or off
    // tab name = which filter tab is open (logo or full)
    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName]; // instead of static true of false to toggle between true and false on click
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
        }

        // after setting the state, activeFilterTab needs to be updated
        setActiveFilterTab((prevState) => {
            // we are spreadding the object and then editing the value of tabName
            return {
                ...prevState,
                [tabName]: !prevState[tabName],
            };
        });
    };

    // type is logo or full
    const handleSubmit = async (type) => {
        if (!prompt) alert("please enter a prompt");
        try {
            // call the back end
            setGeneratingImg(true);

            const res = await fetch("http://localhost:3000/api/v1/dalle", {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt,
                }),
            });
            // this is our data containing the image
            const data = await res.json();

            // accessing the image and giving it to handle decals function
            handleDecals(type, `data:image/png;base64,${data.photo}`);
        } catch (error) {
            alert(error);
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    };

    // show tab content depending on the activeTab
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return (
                    <FilePicker
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
                );
            case "aipicker":
                return (
                    <AiPicker
                        prompt={prompt}
                        setPrompt={setPrompt}
                        generatingImg={generatingImg}
                        handleSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    {/* left menu */}
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation("left")}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => {
                                            setActiveEditorTab(tab.name);
                                        }}
                                    ></Tab>
                                ))}

                                {/* this is called her so it can be ran after rerendering the comp after we change the state of which tab is active */}
                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    {/* go back button */}
                    <motion.div
                        className="absolute top-5 right-5 z-10"
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="Go Back"
                            handleClick={() => {
                                state.intro = true;
                            }}
                            customStyles="w-fit px-4 py-2.5 font-bold"
                        />
                    </motion.div>

                    {/* bottom menue */}
                    <motion.div
                        className="filtertabs-container"
                        {...slideAnimation("up")}
                    >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => {
                                    handleActiveFilterTab(tab.name);
                                }}
                            ></Tab>
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
