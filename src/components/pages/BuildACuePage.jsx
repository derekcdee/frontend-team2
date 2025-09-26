import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../../css/buttons.css";
import "../../css/build-a-cue.css";
import { FullSpliceCue } from "../util/FullSpliceCue";
import { StandardCue } from "../util/StandardCue";

// Model map definition
const models = {
    standard: {
        label: "Standard Cue",
        component: StandardCue,
    },
    fullSplice: {
        label: "Full Splice Cue",
        component: FullSpliceCue,
    },
};

const cueParts = [
    { id: "ferrule", label: "Ferrule" },
    { id: "shaft", label: "Shaft" },
    { id: "shaftCollar", label: "Shaft Collar" },
    { id: "shaftCollarRing", label: "Shaft Collar Ring" },
    { id: "wrap", label: "Wrap" },
    { id: "buttSleeve", label: "Butt Sleeve" },
    { id: "buttCap", label: "Butt Cap" },
    { id: "bumper", label: "Bumper" },
    { id: "tip", label: "Tip" },
];

const materialOptions = [
    { value: "maple", label: "Maple" },
    { value: "ebony", label: "Ebony" },
    { value: "rosewood", label: "Rosewood" },
    { value: "cocobolo", label: "Cocobolo" },
    { value: "carbon", label: "Carbon Fiber" },
    { value: "ivory", label: "Ivory (Synthetic)" },
    { value: "leather", label: "Leather" },
];

export default function BuildACuePage() {
    const orbitRef = useRef(null);

    // Used to switch between models
    const [activeModel, setActiveModel] = useState("standard");
    const ActiveModelComponent = models[activeModel]?.component ?? null;

    const [materialSelections, setMaterialSelections] = useState(() => {
        return cueParts.reduce((acc, part) => {
            acc[part.id] = materialOptions[0]?.value ?? "";
            return acc;
        }, {});
    });

    const handleMaterialChange = (partId, value) => {
        setMaterialSelections((prev) => ({
            ...prev,
            [partId]: value,
        }));
    };

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

    // Render scene with the pool cue model
    return (
        <div className="build-a-cue-page">
            <section className="build-a-cue-card build-a-cue-options">
                <header className="build-a-cue-card__header">
                    <h2>Cue Options</h2>
                    <p>Choose a cue style and experiment with material combinations.</p>
                </header>

                <div className="build-a-cue-field">
                    <label htmlFor="cue-model-select">Cue Model</label>
                    <select
                        id="cue-model-select"
                        className="build-a-cue-select"
                        value={activeModel}
                        onChange={(event) => setActiveModel(event.target.value)}
                    >
                        {Object.entries(models).map(([modelKey, modelValue]) => (
                            <option key={modelKey} value={modelKey}>
                                {modelValue.label}
                            </option>
                        ))}
                    </select>
                </div>

                <section className="build-a-cue-materials">
                    <h3>Materials</h3>
                    <p>
                        Material selections are saved per cue model so you can compare styles quickly.
                    </p>
                    <div className="build-a-cue-material-grid">
                        {cueParts.map((part) => (
                            <div key={part.id} className="build-a-cue-field">
                                <label htmlFor={`${part.id}-material`}>{part.label}</label>
                                <select
                                    id={`${part.id}-material`}
                                    className="build-a-cue-select"
                                    value={materialSelections[part.id]}
                                    onChange={(event) => handleMaterialChange(part.id, event.target.value)}
                                >
                                    {materialOptions.map((material) => (
                                        <option key={material.value} value={material.value}>
                                            {material.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </section>
            </section>

            <section className="build-a-cue-card build-a-cue-preview">
                <header className="build-a-cue-card__header">
                    <h2>Preview</h2>
                    <p>Use the controls to explore the cue from every angle.</p>
                </header>

                <div className="build-a-cue-canvas">
                    <Canvas
                        camera={{ position: [1500, 1000, 0], fov: 400, near: 0.000001, far: 5000 }}
                        orthographic={true}
                    >
                        <OrbitControls ref={orbitRef} maxZoom={6} minZoom={0.5} minDistance={2} />
                        <ambientLight intensity={4.0} />
                        <directionalLight
                            castShadow
                            position={[1000, 1000, 0]}
                            shadow-mapSize={[1024, 1024]}
                            color="white"
                            intensity={2.0}
                        >
                            <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
                        </directionalLight>

                        {ActiveModelComponent && <ActiveModelComponent />}
                    </Canvas>
                </div>

                <div className="build-a-cue-controls">
                    <button className="build-a-cue-control-btn" onClick={zoomIn}>
                        Zoom In (+)
                    </button>
                    <button className="build-a-cue-control-btn" onClick={zoomOut}>
                        Zoom Out (-)
                    </button>
                    <button className="build-a-cue-control-btn reset" onClick={resetView}>
                        Reset View
                    </button>
                </div>
            </section>
        </div>
    );
}
