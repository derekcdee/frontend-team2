import React, { useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "../../css/buttons.css";
import { FullSpliceCue_v1 } from "../util/FullSPliceCue_v1";
import { StandardCue_v2 } from "../util/StandardCue_v2";


export default function BuildACuePage() {
    const orbitRef = useRef(null);

    //buttons
    const zoomIn = () => {
        const controls = orbitRef.current;
        controls.dollyOut(1.1);
        controls.update();
    };

    const zoomOut = () => {
        const controls = orbitRef.current;
        controls.dollyIn(1.1);
        controls.update();
    };

    const resetView = () => {
        const controls = orbitRef.current;
        controls.reset();
    };


    return (
        <div className="BuildACue" style={{ display: "flex", flexDirection: "column" }}>
            <div className="BuildACueDisplay" style={{ flex: "1", width: "100%" }}>
                <Canvas 
                    camera={{ position: [300, 0, 0], fov: 90, near: 0.01, far: 900 }}

                    orthographic={true}
                    style={{ height: "100%" }}
                >
                    <OrbitControls ref={orbitRef} maxZoom={6} minZoom={0.5} minDistance={2} />
                    <ambientLight intensity={2.0} />
                    <directionalLight position={[0, 0, 5]} color="white" />
                    <FullSpliceCue_v1 />
                </Canvas>
                <div className="controls" style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', padding: '12px 16px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
                    <button className="control-btn" onClick={zoomIn}>Zoom In (+)</button>
                    <button className="control-btn" onClick={zoomOut}>Zoom Out (-)</button>
                    <button className="control-btn" onClick={resetView}>Reset View</button>
                </div>
            </div>
        </div>
    );
}
