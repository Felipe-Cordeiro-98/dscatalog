import { NavLink } from "react-router-dom";
import { useState } from "react";

const linkStyle = "text-base text-[#FFFFFF80] hover:text-white transition-colors duration-200";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => `${linkStyle} ${isActive ? "font-bold text-white" : ""}`}
                    onClick={() => setMenuOpen(false)}
                >
                    HOME
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/catalogo"
                    className={({ isActive }) => `${linkStyle} ${isActive ? "font-bold text-white" : ""}`}
                    onClick={() => setMenuOpen(false)}
                >
                    CATÁLOGO
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/admin"
                    className={({ isActive }) => `${linkStyle} ${isActive ? "font-bold text-white" : ""}`}
                    onClick={() => setMenuOpen(false)}
                >
                    ADMIN
                </NavLink>
            </li>
        </>
    );

    return (
        <header className="w-full h-[60px] flex justify-between md:justify-center items-center px-6 bg-[#407BFF] relative">
            {/* Logo */}
            <h1 className="text-white text-2xl font-bold absolute left-5">DS Catalog</h1>

            {/* Menu Desktop */}
            <nav className="hidden md:block">
                <ul className="flex gap-14">{navLinks}</ul>
            </nav>

            {/* Button Hamburguer Mobile */}
            <button
                className="md:hidden flex flex-col justify-between w-6 h-5 absolute right-5 focus:outline-none z-20"
                onClick={toggleMenu}
            >
                <span
                    className={`block w-full h-[2px] bg-white transition-transform duration-300 ${
                        menuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                ></span>
                <span
                    className={`block w-full h-[2px] bg-white transition-opacity duration-300 ${
                        menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                ></span>
                <span
                    className={`block w-full h-[2px] bg-white transition-transform duration-300 ${
                        menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                    }`}
                ></span>
            </button>

            {/* Menu Mobile */}
            <nav
                className={`absolute top-[60px] left-0 w-full bg-[#407BFF] transform transition-all duration-300 md:hidden ${
                    menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col items-center gap-6 py-6">{navLinks}</ul>
            </nav>
        </header>
    );
}
