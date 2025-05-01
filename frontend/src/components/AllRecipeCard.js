import React, { useState } from "react";
import "../styles/AllRecipeCard.css";  
import Heart from "../assets/heart.svg";
import WhiteHeart from "../assets/heartwhite.svg";
import Star from "../assets/star.svg";
import EmptyStar from "../assets/emptystar.svg";

function AllRecipeCard({ image, title, summary, rate, ratingCount }) {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    const totalStars = 5;

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rate); // 꽉 찬 별 갯수
        const hasHalfStar = rate - fullStars >= 0.5; // 반 별 체크

        for (let i = 0; i < fullStars; i++) {
            stars.push(<img key={`full-${i}`} src={Star} alt="Full Star" className="star-icon" />);
        }

        if (hasHalfStar) {
            stars.push(<img key="half" src={EmptyStar} alt="Empty Star" className="star-icon" />);
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

                {/* ⭐ 별 + 평점 + 갯수 */}
                <div className="recipe-rating-wrapper">
                    <div className="recipe-rate">
                        {renderStars()}
                        <span className="rate-text">{rate} / 5</span>
                        <span className="rating-count">({ratingCount} ratings)</span>
                    </div>
                    
                    {/* 버튼은 아래 따로 */}
                    {/* <button className="view-recipe-btn-recipe">View Recipe</button> */}
                </div>
            </div>
        </div>
    );
}

export default AllRecipeCard;
