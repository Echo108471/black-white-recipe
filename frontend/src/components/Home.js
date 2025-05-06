/* Home.js */
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import RecipeCardHome from "./RecipeCardHome.js";
import HomeBackground from "../assets/home_background.svg"; 
import PastaImage from "../assets/pasta.png";
import WaffleImage from "../assets/waffles.png";
import SteakImage from "../assets/steak.png";
import SearchBox from "./SearchBox";


function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/recipes")
            .then((res) => res.json())
            .then((data) => setRecipes(data))
            .catch((err) => console.error("Failed to fetch recipes:", err));
    }, []);

    return (
        <div className="home-container">
            <div className="home-box">
                <h2>백색인 재료가 흑색이 되기 전에 요리해 먹을 수 있게!</h2>
            </div>
            <div className="most-search">
            <h1>Most searched recipes</h1>
                <div className="most-card">
                    {recipes.map((recipe) => (
                        <RecipeCardHome
                            key={recipe.id}
                            image={`http://localhost:8000${recipe.image_url}`} className="recipe-image"
                            title={recipe.title}
                            summary={recipe.description}
                        />
                    ))}
                </div>
            </div>
            <div className="pop-search">
                <SearchBox />
            </div>
        </div>
    );
}

export default Home;
