import React from "react";
import "./Header.css";
import LogoIcon from "../assets/logo.svg";
import CreateImage from "../assets/create.svg";

function Header() {
    return (
        <header className="header">
            <div className="LogoContainer">
                <img src={LogoIcon} alt="logo" className="LogoIcon" />
                <h1 className="logo">흑백 레시피</h1>
            </div>
        <div className="buttons">
            <button className="login">Login</button>
            <button className="create">Create</button>
            <img src={CreateImage} alt ="CreateImage" className = "CreateImage" />

        </div>
        <hr className="GrayLine" />
      </header>
    );
}
export default Header;