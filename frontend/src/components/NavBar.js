import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom"; // ✅ `Link`만 사용

function NavBar() {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/ingredients">Ingredients</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ranking">Ranking</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
