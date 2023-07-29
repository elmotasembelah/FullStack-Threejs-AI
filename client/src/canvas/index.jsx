/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import BackDrop from "./BackDrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
    return (
        <Canvas
            shadows // enables shadows
            camera={{ position: [0, 0, 0], fov: 30 }} // controls the camera of the over all canvas
            gl={{ preserveDrawingBuffer: true }}
            className="w-full max-w-full h-9 transition-all ease-in"
        >
            {/* controls the lighting of the cavnas */}
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            <CameraRig>
                <BackDrop />
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    );
};

export default CanvasModel;
