import React, { useState } from "react";
import RecipeCard from "./AllRecipeCard"; 
import "../styles/Recipes.css";  
import PastaImage from "../assets/pasta.png";
import WaffleImage from "../assets/waffles.png";
import SteakImage from "../assets/steak.png";
import Heart from "../assets/heart.svg";
import SearchIcon from "../assets/searchicon.svg"
import LeftArrow from "../assets/Leftarrow.svg"
import RightArrow from "../assets/RightArrow.svg"



function AllRecipe() {
    const [RecipesearchTerm, RecipesetSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const recipesPerPage = 16;
    const recipes = [
    {
        id: 1,
        image: PastaImage,
        title: " Pasta",
        summary: "Cool recipe to eat with friends in the morning.",
        rate: 4.8,
    },
    {
        id: 2,
        image: WaffleImage,
        title: "Belgian Waffles",
        summary: "Cool recipe to eat with friends in the morning.",
        rate: 4.8,
    },
    {
        id: 3,
        image: SteakImage,
        title: "Garlic Buffalo Wings",
        summary: "Cool recipe to eat with friends in the morning.",
        rate: 4.8,
    }
];
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(RecipesearchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="recipe-list">
            <h2>Search results for</h2>
            <img src={SearchIcon} alt ="searchicon-recipe" className="searchIcon-recipe"></img>
            <input
                type="text"
                className="search-recipe-bar"
                placeholder="Search"
                value={RecipesearchTerm}
                onChange={(e) => RecipesetSearchTerm(e.target.value)}
            />
            <div className="recipe-cards">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        image={recipe.image} className="recipe-image"
                        title={recipe.title}
                        // summary={recipe.summary}
                        rate={recipe.rate}
                    />
                ))}
            </div>

        {/* 페이지네이션 */}
        <div className="pagination">
        <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-arrow"
        >
            {<img src={LeftArrow} alt ="leftarrow" className="leftarrow"></img>}
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
        <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
        >
            {page}
        </button>
    ))}

        <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-arrow"
        >
            {<img src={RightArrow} alt ="rightarrow" className="rightarrow"></img>}
        </button>
    </div>
</div>
    );
}



export default AllRecipe;
