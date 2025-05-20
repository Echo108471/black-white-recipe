import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FindPassword.css";
import Loginpic from "../assets/loginpic.svg";
import LogoIcon from "../assets/logo.svg";

function FindPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handlePassword = async (e) => {
        e.preventDefault();
        try {
            // 여기에 실제 백엔드 요청이 있다면 추가하세요.
            alert(`📧 Password reset link sent to ${email}`);
            navigate("/login");
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Failed to process password reset.");
        }
    };

    return (
        <div className="find-password-container">
            <img src={Loginpic} alt="Loginpic" className="Loginpic" />
            <div className="passwordfind">
                <div className="logogoing">
                    <img src={LogoIcon} alt="logo-login" className="LogoIcon-login" />
                    <h1>BnW Recipe</h1>
                </div>
                <h2>Email Address</h2>
                <form onSubmit={handlePassword} className="password-find-form">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
                <p className="go-login-password" onClick={() => navigate("/login")}>
                Back to log in?
                </p>
            </div>
        </div>
    );
}

export default FindPassword;
