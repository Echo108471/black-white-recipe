import React, { useState } from "react";
import "./Recipes.css";
import RecipeInformation from "./components/RecipeInformation"; 

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
    </div>
  );  // ✅ Added missing closing bracket
}

export default Recipes;
