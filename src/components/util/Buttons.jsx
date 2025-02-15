import React from "react";
import { useNavigate } from "react-router-dom";

export function LoginButton() {
    const navigate = useNavigate();

    return (
        <button
            className="fa-solid fa-user header-icon"
            onClick={() => navigate('/account/login')}
        >
        </button>
    );
}