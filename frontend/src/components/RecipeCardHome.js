import React from "react";
import "../styles/Home.css";

function RecipeCardHome({ image, title, summary }) {
    return (
        <div className="recipe-card-Home">
            <img src={image} alt={title} className="recipe-image-Home" />
            <h2 className="recipe-title-Home">{title}</h2>
            <p className="recipe-summary-Home">{summary}</p>
            <button className="view-recipe-btn-Home">View Recipe</button>
        </div>
    );
}

export default RecipeCardHome;
