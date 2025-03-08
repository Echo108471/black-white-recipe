/* Home.js */
import React from "react";
import "../styles/Home.css";
import RecipeCard from "./RecipeCard";
import HomeBackground from "../assets/home_background.svg"; 
import PastaImage from "../assets/pasta.png";
import WaffleImage from "../assets/waffles.png";
import SteakImage from "../assets/steak.png";
import SearchBox from "./SearchBox";


// dummy food datas
const recipes = [
    {
        id: 1,
        image: PastaImage,
        title: " Pasta",
        summary: "Cool recipe to eat with friends in the morning.",
    },
    {
        id: 2,
        image: WaffleImage,
        title: "Belgian Waffles",
        summary: "Cool recipe to eat with friends in the morning.",
    },
    {
        id: 3,
        image: SteakImage,
        title: "Garlic Buffalo Wings",
        summary: "Cool recipe to eat with friends in the morning.",
    }
];


function Home() {
    return (
        <div className="home-container">
            <div className="home-box">
                <h2>백색인 재료가 흑색이 되기 전에 요리해 먹을 수 있게!</h2>
            </div>
            <div className="most-search">
            <h1>Most searched recipes</h1>
                <div className="most-card">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            image={recipe.image}
                            title={recipe.title}
                            summary={recipe.summary}
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
