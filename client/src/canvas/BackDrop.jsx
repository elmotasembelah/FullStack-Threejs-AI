import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

// backdrop is the hsadow around the shirt
const BackDrop = () => {
    const shadows = useRef();

    return (
        <AccumulativeShadows
            ref={shadows}
            temporal //smoothes the edges of the shadows
            frames={60}
            alphaTest={0.85} // the transperency of the shadoes
            scale={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.14]}
        >
            <RandomizedLight
                amount={4}
                radius={9}
                intensity={0.55}
                ambient={0.25}
                position={[5, 5, -10]}
            />
            {/* i can add another light source to the scene */}
            <RandomizedLight
                amount={4}
                radius={9}
                intensity={0.35}
                ambient={0.55}
                position={[-5, 5, -10]}
            />
        </AccumulativeShadows>
    );
};

export default BackDrop;
