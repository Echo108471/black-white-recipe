import React, { useState } from "react";
import "../styles/IngredientsCreateRecipe.css";
import Plus from "../assets/plus.svg";



function IngredientsCreateRecipe({ ingredients, handleInputChange, addMoreIngredient }) {

    return (
        <div className="ingredients-container">  
            {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="ingredients-container1">
                    <input
                        type="text"
                        value={ingredient.name}  
                        onChange={(e) => handleInputChange(ingredient.id, "name", e.target.value)}
                        className="IngredientName"
                        placeholder="e.g.) Pork"
                    />

                    <input
                        type="text"
                        value={ingredient.amount} 
                        onChange={(e) => handleInputChange(ingredient.id, "amount", e.target.value)}
                        className="NumberOfIngredient"
                        placeholder="e.g.) 10 (servings)"
                    />

                    <input
                        type="text"
                        value={ingredient.note}  
                        onChange={(e) => handleInputChange(ingredient.id, "note", e.target.value)}
                        className="note"
                        placeholder="e.g.) g, ml (etc.)"
                    />
                </div>
            ))}
            
            <button onClick={addMoreIngredient} className="add-more-btn">
            <img src={Plus} alt="Plus" />
                Add
            </button>
        </div>
    );
}

export default IngredientsCreateRecipe;
