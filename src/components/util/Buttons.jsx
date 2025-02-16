import React from "react";
import { useNavigate } from "react-router-dom";

/*==============================================================
# Defaults
==============================================================*/
export function Button({text}) {
    return (
        <button className="default-button">
            {text}
        </button>
    );
}


/*==============================================================
# Login
==============================================================*/
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

export function DrawerLoginButton() {
    return (
        <a className="drawer-foot-nav-text" tabIndex={0} href="/account/login">
            <button className="fa-solid fa-user drawer-login-icon" tabIndex={-1} />
            Log In
        </a>
    );
}