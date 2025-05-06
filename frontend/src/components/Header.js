import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 가져오기
import "../styles/Header.css";
import LogoIcon from "../assets/logo.svg";
import CreateImage from "../assets/create.svg";

function Header() {
    const navigate = useNavigate(); // ✅ useNavigate 사용

    return (
        <header className="header">
            <div className="LogoContainer" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <img src={LogoIcon} alt="logo" className="LogoIcon" />
                <h1 className="logo">BnW Recipe</h1>
            </div>
            <div className="buttons">
                <button className="login">Login</button>
                <button className="create" onClick={() => navigate("/create")}>
                    Create
                    <img src={CreateImage} alt="CreateImage" className="CreateImage" />
                </button>
            </div>
            <hr className="GrayLine" />
        </header>
    );
}

export default Header;
