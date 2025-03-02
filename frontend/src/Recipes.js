import React, { useState } from "react";
import "./Recipes.css";
import RecipeInformation from "./components/RecipeInformation"; 
import IngredientsCreateRecipe from "./components/IngredientsCreateRecipe"; 


function Recipes() {
  const [ingredients, setIngredients] = useState([]); 
  const [newIngredient, setNewIngredient] = useState("");

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient]); 
      setNewIngredient(""); 
    }
  };

  return (
    <div className="createrecipe-container"> 
      <div className="createrecipe">
        <h1>Create Recipe</h1>
      </div>
      <div className="RecipeInformation"> 
        <RecipeInformation />  
      </div>
      <div className="Ingredients">
        <h1>Ingredients</h1>
        <IngredientsCreateRecipe />
      </div>
    </div>
  );  
}

export default Recipes;
