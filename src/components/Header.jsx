import React, { useState, useEffect, useRef } from "react";
import { useOutsideClick } from "../util/hooks";
import logo from "../images/white_logo.jpg";

const options = {
    "Cues & Accessories": [
        { text: "Pool Cues", link: "/collections/available" },
        { text: "Accessories", link: "/collections/available" },
        { text: "View All", link: "/collections/available" }
    ],
    "Materials": [
        { text: "Woods", link: "/collections/materials" },
        { text: "Crystals", link: "/collections/materials" },
        { text: "View All", link: "/collections/materials" }
    ]
};

const navItems = [
    { text: "Cues & Accessories", options: options["Cues & Accessories"] },
    { text: "Coming Soon", link: "/collections/coming-soon" },
    { text: "Build-A-Que", link: "/build-a-que" },
    { text: "Materials", options: options["Materials"] }
];

export default function Header() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const timeoutRef = useRef(null);

    const handleDropdown = (item) => {
        clearTimeout(timeoutRef.current);
        
        if (openDropdown === item) {
            setOpenDropdown(null);
        } else if (openDropdown) {
            // If another dropdown is open, first close it, then open the new one after a delay
            setOpenDropdown(null);
            timeoutRef.current = setTimeout(() => {
                setOpenDropdown(item);
            }, 300);
        } else {
            // If no dropdown is open, open the new one immediately
            setOpenDropdown(item);
        }
    }

    const handleScroll = () => {
        const offset = 100;
        if (window.scrollY > offset) {
            setHasScrolled(true);
        } else if (window.scrollY === 0) {
            setHasScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutRef.current); // Clear any pending timeouts when the component unmounts
        }
    }, []);

    return (
        <header className="main-header sticky">
            {/* Drawer */}
            <div className="header-drawer">
                <button className="fa-solid fa-bars header-icon" />

                {/* MENU DRAWER HERE*/}
                <div> 
                    {/* MENU DRAWER NAV*/}
                    <nav>

                    </nav>
                    {/* MENU DRAWER FOOTER*/}
                    <div>

                    </div>
                </div>
            </div>

            {/* Main Heading */}
            <h1 className="header-heading">
                <a href="/" className={hasScrolled ? "scrolled-past" : "" }>
                    <img src={logo} className={hasScrolled ? "header-logo scrolled-past" : "header-logo" }/>
                </a>
            </h1>

            {/* Nav Section w/ Dropdown Menu*/}
            <nav className="header-navigation">
                <ul className="header-list-menu">
                    {navItems.map((navItem) => {
                        const { text, link, options } = navItem;

                        return (
                            <li>
                                <NavItem text={text} link={link} options={options} isDropdown={!link && options} isOpen={openDropdown === text} onToggle={handleDropdown} />
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Icons */}
            <div className="header-icons">
                <button className="fa-solid fa-magnifying-glass header-icon" />
                <button className="fa-solid fa-user header-icon" />
                <button className="fa-solid fa-cart-shopping header-icon" />
            </div>
        </header>
    );
}

function NavItem({text, isDropdown, isOpen, onToggle, options=false, link=false}) {
    const ref = useRef(null); // Create a ref for the dropdown container

    // Use the custom hook to handle outside clicks
    useOutsideClick(ref, (e) => {
        if (!isOpen) return;

        if (e.target.id === "" && !(text !== e.target.id && e.target.id !== "")) {
            onToggle(text);
        }
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onToggle(text);
        }
    };

    return (
        <div className="header-nav-item" ref={isDropdown ? ref : null}>
            <a 
              onClick={isDropdown ? () => onToggle(text) : undefined}
              onKeyDown={isDropdown ? handleKeyDown : undefined}
              tabIndex={0} 
              href={link}
              className={isOpen ? "main-nav-text open" : "main-nav-text"}
              id={text}
            >
                {text}
                {isDropdown && 
                    <button 
                      className={isOpen ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"} 
                      tabIndex={-1}
                      id={text}
                    />
                }
            </a>
            
            {/* DROPDOWN MENU */}
            <div className={isOpen ? "dropdown-menu open" : "dropdown-menu"}>
                {/* Dropdown content goes here */}
                <ul className="header-list-sub-menu">
                    {options?.length && options.map((option) => {
                        const {text, link} = option;
                        
                        return (
                            <li>
                                <a href={link}>{text}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
