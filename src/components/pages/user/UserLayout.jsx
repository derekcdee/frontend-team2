import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <div className="user-layout">
            <div className="user-drawer-menu open">
                <nav className="user-nav">
                    <ul className="user-nav-list">
                        <li className="user-nav-item">
                            <NavLink to="/account/profile">Profile</NavLink>
                        </li>
                        <li className="user-nav-item">
                            <NavLink to="/account/settings">Settings</NavLink>
                        </li>
                        <li className="user-nav-item">
                            <NavLink to="/account/orders">Orders</NavLink>
                        </li>
                        <li className="user-nav-item">
                            <NavLink to="/account/admin">Admin</NavLink>
                        </li>
                        <li className="user-nav-item">
                            <NavLink to="/">Logout</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </div>
    );
}