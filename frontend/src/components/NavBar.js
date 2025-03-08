import React from "react";
import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom"; // ✅ `Link`만 사용

function NavBar() {
    return (
        <div className = "navbar-container">
            <nav className="navbar">
                <ul>
                    <li><Link to="/recipes">Recipes</Link></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ranking">Ranking</Link></li>
                </ul>
            </nav>
        </div>
        
    );
}

export default NavBar;
