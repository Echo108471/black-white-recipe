import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AccountCreate.css";
import Loginpic from "../assets/loginpic.svg";
import PlusAccount from "../assets/plusaccount.svg";
import LogoIcon from "../assets/logo.svg";

function AccountCreate() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        if (image) formData.append("image", image);

        try {
            const res = await fetch("http://localhost:8000/register", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                alert("✅ Account created successfully!");
                navigate("/login");
            } else {
                const err = await res.json();
                alert(`❌ Failed: ${err.detail}`);
            }
        } catch (err) {
            console.error("Registration error:", err);
            alert("❌ Something went wrong.");
        }
    };

    return (
        <div className="account-create-container">
            <img src={Loginpic} alt="Login" className="Loginpic" />
            <div className="createaccount">
                <div className="logogoing">
                    <img src={LogoIcon} alt="logo-login" className="LogoIcon-login" />
                    <h1>BnW Recipe</h1>
                </div>
                <h2>Create Account</h2>
                <form onSubmit={handleRegister} className="account-create-form">
                    {/* 프로필 이미지 업로드 */}
                    <label htmlFor="fileInput" className="profile-upload">
                        <img src={PlusAccount} alt="plusaccount" />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                    <h3>Add Profile Photo</h3>
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Profile ID"
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
                    <button type="submit">JOIN NOW</button>
                    <p className="go-login" onClick={() => navigate("/login")}>
                        Already have an account? Log in
                    </p>
                </form>
            </div>
        </div>
    );
}

export default AccountCreate;
