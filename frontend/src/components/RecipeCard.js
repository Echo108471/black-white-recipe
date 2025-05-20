import React from "react";
import { useNavigate } from "react-router-dom";  // 추가
import "../styles/Home.css";

function RecipeCard({ id, image, title, summary }) {
    const navigate = useNavigate();  // 추가

    const handleView = () => {
        navigate(`/recipes/${id}`);  // 해당 레시피 상세 페이지로 이동
    };

    return (
        <div className="recipe-card">
            <img src={image} alt={title} className="recipe-image" />
            <h2 className="recipe-title">{title}</h2>
            <p className="recipe-summary">{summary}</p>
            <button className="view-recipe-btn" onClick={handleView}>
                View Recipe
            </button>
        </div>
    );
}

export default RecipeCard;
