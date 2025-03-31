import React, {Suspense} from "react";
import { createRoot } from 'react-dom/client';
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function BuildACuePage () {
    return (
        <div>
            build a cue
            <Cue />
        </div>
    );
}

export function Cue() {
    return (
        <div>
            <Canvas>
                <mesh>
                    <boxGeometry args={[4, 4, 4]} />
                    <meshPhongMaterial />
                </mesh>
                <ambientLight intensity={0.1} />
                <directionalLight position={[0, 0, 5]} color="red" />
                <OrbitControls />
            </Canvas>
        </div>
    )
  }

createRoot(document.getElementById('root')).render(<Cue />)