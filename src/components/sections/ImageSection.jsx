import React from "react";

export default function ImageSection () {

    return (
        <section className="image-section">
            <img   
                src={"https://jmillercustomcues.nyc3.cdn.digitaloceanspaces.com/homepage/featured.jpg"} 
                alt="Welcome To J.Miller Cues" 
                onError={(e) => {
                    // Fallback styling if image fails to load
                    e.target.style.backgroundColor = '#f0f0f0';
                    e.target.style.display = 'block';
                }}
            />
        </section>
    );
}