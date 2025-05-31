import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import LogoIcon from "../assets/logo.svg";
import CreateImage from "../assets/create.svg";

function Header() {
    const navigate = useNavigate();
    const location = useLocation(); // ✅ URL이 바뀔 때 감지
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 여부를 URL 이동마다 확인
        const loginStatus = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loginStatus);
    }, [location]); // ✅ location이 바뀔 때마다 확인

    return (
        <header className="header">
            <div className="LogoContainer" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <img src={LogoIcon} alt="logo" className="LogoIcon" />
                <h1 className="logo">BnW Recipe</h1>
            </div>
            <div className="buttons">
                {isLoggedIn ? (
                    <button className="login" onClick={() => navigate("/myaccount")}>My Account</button>
                ) : (
                    <button className="login" onClick={() => navigate("/login")}>Login</button>
                )}
                <button className="create" onClick={() => navigate("/create")}>
                    Create
                    <img src={CreateImage} alt="Create" className="CreateImage" />
                </button>
            </div>
            <hr className="GrayLine" />
        </header>
    );
}

export default Header;
