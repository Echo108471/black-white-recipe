import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function RecipeCardHome({ id, image, title, summary }) {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/recipes/${id}`);
    };

    return (
        <div className="recipe-card-Home">
            <img src={image} alt={title} className="recipe-image-Home" />
            <h2 className="recipe-title-Home">{title}</h2>
            <p className="recipe-summary-Home">{summary}</p>
            <button className="view-recipe-btn-Home" onClick={handleView}>
                View Recipe
            </button>
        </div>
    );
}

export default RecipeCardHome;
