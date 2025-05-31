import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyAccount.css";

function MyAccount() {
    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const rawImageUrl = localStorage.getItem("image_url");
    const imageUrl = rawImageUrl ? `http://localhost:8000${rawImageUrl}` : "/default-profile.jpg";
    
    const handleLogout = () => {
        // localStorage 정리
        localStorage.removeItem("username")
        localStorage.removeItem("email");
        localStorage.removeItem("image_url");
        localStorage.setItem("isLoggedIn", "false");

        alert("✅ Logged out!");
        navigate("/");
    };

    return (
        <div className="all-container">
            <div className="account-container">
                <h1>My Account</h1>
                <div className="profile-box">
                    <img
                        src={imageUrl || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="profile-info">
                        <p><strong>Username:</strong> {username}</p>
                        <p><strong>Email:</strong> {email}</p>
                    </div>
                </div>
                <div className="account-options">
                <h2>Account Settings</h2>
                <ul className="account-menu">
                    <li className="menu-item disabled">Edit Profile</li>
                    <li className="menu-item disabled">Change Password</li>
                    <li className="menu-item disabled">My Recipes</li>
                    <li className="menu-item disabled">Saved Recipes</li>
                    <li className="menu-item disabled">Notification Settings</li>
                    <li className="menu-item disabled">Language Preference</li>
                    <li className="menu-item disabled">Theme</li>
                    <li className="menu-item disabled">Help & Support</li>
                    <li className="menu-item disabled">Report a Problem</li>
                    <li className="menu-item disabled" style={{ color: "#c00" }}>Delete Account</li>
                </ul>
                </div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default MyAccount;
