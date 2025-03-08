import React from "react";
import "../styles/Home.css";

function RecipeCard({ image, title, summary }) {
    return (
        <div className="recipe-card">
            <img src={image} alt={title} className="recipe-image" />
            <h2 className="recipe-title">{title}</h2>
            <p className="recipe-summary">{summary}</p>
            <button className="view-recipe-btn">View Recipe</button>
        </div>
    );
}

export default RecipeCard;
