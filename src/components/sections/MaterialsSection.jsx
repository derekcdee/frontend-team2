import React from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../util/Buttons";

export default function MaterialsSection() {
    const navigate = useNavigate();

    return (
        <section className="materials-section">
            <div className="materials-container">
                <div className="materials-image">
                    <img 
                        src={"https://jmillercustomcues.nyc3.cdn.digitaloceanspaces.com/homepage/materials.jpg"} 
                        alt="Premium Materials"
                        onError={(e) => {
                            // Fallback styling if image fails to load
                            e.target.style.backgroundColor = '#f0f0f0';
                            e.target.style.display = 'block';
                        }}
                    />
                </div>
                <div className="materials-content">
                    <h2 className="materials-title">
                        PREMIUM MATERIALS
                    </h2>
                    <p className="materials-subtitle">
                        Explore our carefully curated selection of exotic woods and semi-precious crystals, each chosen for their unique beauty and exceptional quality.
                    </p>
                    <DefaultButton 
                        text="View Materials" 
                        onClick={() => navigate('/collections/materials')}
                        className="materials-button-custom"
                    />
                </div>
            </div>
        </section>
    );
}