import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ 추가
import "../styles/AllRecipeCard.css";  
import Heart from "../assets/heart.svg";
import WhiteHeart from "../assets/heartwhite.svg";
import Star from "../assets/star.svg";
import EmptyStar from "../assets/emptystar.svg";

function AllRecipeCard({ id, image, title, summary, rate, ratingCount }) {
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();  // ✅ 훅은 최상단에서 호출해야 함

    const toggleLike = () => {
        setLiked(!liked);
    };

    const handleView = () => {
        navigate(`/recipes/${id}`);
    };

    const totalStars = 5;

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rate); 
        const hasHalfStar = rate - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<img key={`full-${i}`} src={Star} alt="Full Star" className="star-icon" />);
        }

        if (hasHalfStar) {
            stars.push(<img key="half" src={EmptyStar} alt="Half Star" className="star-icon" />);
        }

        while (stars.length < totalStars) {
            stars.push(<img key={`empty-${stars.length}`} src={EmptyStar} alt="Empty Star" className="star-icon" />);
        }

        return stars;
    };

    return (
        <div className="recipe-card-recipe">
            <img src={image} alt={title} className="recipe-image-recipe" />
            
            <div className="card-content">
                <div className="card-header">
                    <h2 className="recipe-title-recipe">{title}</h2>
                    <button className="like-btn" onClick={toggleLike}>
                        {liked ? (
                            <img src={Heart} alt="Heart" className="Heart" />
                        ) : (
                            <img src={WhiteHeart} alt="WhiteHeart" className="WhiteHeart" />
                        )}
                    </button>
                </div>

                <p className="recipe-summary">{summary}</p>

                <div className="recipe-rating-wrapper">
                    <div className="recipe-rate">
                        {renderStars()}
                        <span className="rate-text">{rate} / 5</span>
                        <span className="rating-count">({ratingCount} ratings)</span>
                        <button className="view-recipe-btn-recipe" onClick={handleView}>View Recipe</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllRecipeCard;
