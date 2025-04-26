import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom"; // ✅ `Link`만 사용
import LogoIcon from "../assets/logo.svg";
import FacebookIcon from "../assets/facebookicon.svg";
import TwitterIcon from "../assets/twittericon.svg";
import InstaIcon from "../assets/instaicon.svg";
import YoutubeIcon from "../assets/youtubeicon.svg";


function Footer() {
    return (
        <footer className="footers">
            <div className="footer">
            {/*<img src={LogoIcon} alt="logo_footer" className="LogoIcon_footer" />*/}
            <h1>BnW Recipe</h1>
            <ul>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ranking">Ranking</Link></li>
            </ul>
            <div className="Icons">
                <img src={FacebookIcon} alt="FacebookIcon" className="FacebookIcon" />
                <img src={TwitterIcon} alt="TwitterIcon" className="TwitterIcon" />
                <img src={YoutubeIcon} alt="YoutubeIcon" className="YoutubeIcon" />
                <img src={InstaIcon} alt="InstaIcon" className="InstaIcon" />
            </div>
            </div>
            <hr className="WhiteLine" />
                <h2 className="BnWFooter">© 2025 BnW Recipe</h2>

        </footer>
    );
}

export default Footer;
