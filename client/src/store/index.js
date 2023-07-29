import { proxy } from "valtio";

const state = proxy({
    intro: true, // are on the home page or not
    color: "#EFBD48", // default oclor
    isLogoTexture: true, // are currently showing the logo on our shirt
    isFullTexture: false, //
    logoDecal: "./threejs.png", // this png is in public folder
    fullDecal: "./threejs.png",
});

export default state;
