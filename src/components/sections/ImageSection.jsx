import React from "react";
import img from "../../images/featured.jpg";

export default function ImageSection () {

    return (
        <section className="image-section">
            <img src={img} />
        </section>
    );
}