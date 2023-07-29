/* eslint-disable react/no-unknown-property */
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

// this is the shirt object itself
const Shirt = () => {
    const snap = useSnapshot(state);

    // creating the shirt
    const { nodes, materials } = useGLTF("/shirt_baked.glb");

    // making out textures from images ( what appears on our 3d object )
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    // changing the color of the shirt smoothly
    useFrame(() => {
        // easing,dampC(color value to be changed, new color, duration)
        easing.dampC(materials.lambert1.color, snap.color, 0.25);
    });

    // used to fix an error where the model won't update sometimes, this wat react will redner th emodel whenever the state changes
    const stateString = JSON.stringify(snap);

    return (
        <group
            // used to fix an error where the model won't update sometimes, this wat react will redner th emodel whenever the state changes
            key={stateString}
        >
            <mesh
                castShadow // makes the 3d model cast a shadow
                geometry={nodes.T_Shirt_male.geometry} // got it from the useGLTF hook on the shirt glb
                material={materials.lambert1} // got it from the useGLTF hook on the shirt glb
                material-roughness={0.1} //
                dispose={null}
            >
                {/* cases for decal { logo } */}
                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}
                {/* if it is not showing, change the positions around */}
                {snap.isLogoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.15}
                        map={logoTexture}
                        // extra porps
                        // map-anisotropy={0} // error for me
                        depthTest={false} // this will make sure that it is rendered on top of mur models
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
};

export default Shirt;
