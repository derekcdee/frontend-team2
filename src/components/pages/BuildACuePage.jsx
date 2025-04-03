import React, {Suspense} from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CueModelOne } from "../util/CueModelOne";

export default function BuildACuePage () {
    return (
        <div className="BuildACue" style={{ display: "flex", flexDirection: "column" }}>
            <div className="BuildACueDisplay" style={{ flex: "1", width: "100%" }}>
                <Canvas 
                    camera={{position: [2,-300,0], fov: 90, near: 0.01, far: 900}} 
                    orthographic={true}
                    style={{ height: "100%" }}
                >
                    <OrbitControls maxZoom={6} minZoom={0.5} minDistance={2}/>
                    <ambientLight intensity={2.0} />
                    <directionalLight position={[0, 0, 5]} color="white" />
                    <CueModelOne />
                </Canvas>
            </div>
        </div>
    );
}
