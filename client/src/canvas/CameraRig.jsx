/* eslint-disable react/prop-types */
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";

import state from "../store";
import { useRef } from "react";

// ! controles the camera positioning
// children are the components inside of this comp
const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);

    // executes on every frame
    useFrame((state, delta) => {
        // making the shirt position responsive
        // setting up breakpoints
        const isBreakPoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // initial position
        let targetPosition = [-0.4, 0, 2];
        // change the position according to these conditions
        if (snap.intro) {
            if (isBreakPoint) targetPosition = [0, 0, 2];
            if (isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            if (isMobile) {
                targetPosition = [0, 0, 2.5];
            } else {
                targetPosition = [0, 0, 2];
            }
        }

        // moves the model ( camera on the model ) smoothly to change the place of the mmodel
        // easing,damp3(current position, target position, duration , unknown)
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        // set the model rotation smoothly
        // easing.dampE(rotation angle of the model, new position acoording to the pointer, duration, unknown)
        easing.dampE(
            group.current.rotation,
            [-state.pointer.y / 5, state.pointer.x / 2, 0],
            0.25,
            delta
        );
    });

    return <group ref={group}>{children}</group>;
};

export default CameraRig;
