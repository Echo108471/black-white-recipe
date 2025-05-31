import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Loginpic from "../assets/loginpic.svg";
import LogoIcon from "../assets/logo.svg";




function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                body: formData,
            });
        
            if (response.ok) {
                const data = await response.json();
            
                // ✅ 로그인 정보 저장
                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("email", data.email);
                localStorage.setItem("username", data.username);
                localStorage.setItem("image_url", data.image_url);
                localStorage.setItem("isLoggedIn", "true");
            
                alert("✅ Login successful!");
                navigate("/");
            }
            else {
            const error = await response.json();
            alert(`Login failed: ${error.detail}`);
        }
        } catch (err) {
            console.error("Login error:", err);
            alert("Login request failed.");
        }
    };

return (
<div className="login-container">
    <img src={Loginpic} alt="Loginpic" className="Loginpic" />
    <div className="login-con">
        <div className="logogoing">
            <img src={LogoIcon} alt="logo-login" className="LogoIcon-login" />
            <h1>BnW Recipe</h1>
        </div>
        <h2>Log in with username</h2>
        <form onSubmit={handleLogin} className="login-form">
        <input
            type="text"
            placeholder="ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
        </form>
        <p onClick={() => navigate("/findpassword")} style={{ cursor: "pointer" }}>Forgot password?</p>
        <h3>Don’t have an account?</h3>
        <h4 onClick={() => navigate("/accountcreate")} style={{ cursor: "pointer", color: "#007BFF", textDecoration: "underline" }}>Join Now</h4>
    </div>
</div>
);
}

export default Login;
