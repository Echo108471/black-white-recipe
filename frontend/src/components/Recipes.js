import React, { useState, useEffect } from "react";
import RecipeCard from "./AllRecipeCard"; 
import "../styles/Recipes.css";  
import PastaImage from "../assets/pasta.png";
import WaffleImage from "../assets/waffles.png";
import SteakImage from "../assets/steak.png";
import Heart from "../assets/heart.svg";
import SearchIcon from "../assets/searchicon.svg"
import LeftArrow from "../assets/Leftarrow.svg"
import RightArrow from "../assets/RightArrow.svg"
import { useLocation } from "react-router-dom";



function AllRecipe() {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [RecipesearchTerm, RecipesetSearchTerm] = useState(queryParams.get("search") || "");

    const recipesPerPage = 16;
    useEffect(() => {
        const ingredients = queryParams.get("ingredients");
        const url = ingredients
            ? `http://localhost:8000/filtered-recipes/?filter_terms=${ingredients}`
            : `http://localhost:8000/recipes`;
    
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("🧪 API Response:", data);
                // filtered-recipes는 객체 배열이 아니라 객체 형태로 들어오는 경우 대응
                if (Array.isArray(data)) {
                    setRecipes(data);
                } else if (Array.isArray(data.results)) {
                    setRecipes(data.results);
                } else {
                    setRecipes([]); // fallback to empty list
                }
            })
            .catch((err) => console.error("Failed to fetch recipes:", err));
    }, [location.search]);
    
    
    
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
                {filteredRecipes.map((recipe) => {
                const ratingScores = recipe.ratings || [];
                const averageRating = ratingScores.length
                    ? parseFloat((ratingScores.reduce((a, b) => a + b, 0) / ratingScores.length).toFixed(1))
                    : 0;

                console.log(`📊 Recipe: ${recipe.title}, Avg Rating: ${averageRating}, Ratings:`, ratingScores); // ✅

                return (
                    <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    image={`http://localhost:8000${recipe.image_url}`}
                    title={recipe.title}
                    rate={recipe.average_rating || 0}
                    ratingCount={recipe.ratings?.length || 0}
                    />
                );
            })}
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
