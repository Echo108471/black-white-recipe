import React from "react";
import "../styles/Footer.css";
import LogoIcon from "../assets/logo.svg";


function Footer() {
    return (
        <footer className="footer">
            <img src={LogoIcon} alt="logo_footer" className="LogoIcon_footer" />
                <ul>
                    <li>Black And White Recipes</li>
                    <li>University of California, Davis</li>
                </ul>
        </footer>
    );
}

export default Footer;
