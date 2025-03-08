import React, { useState } from "react";
import "../styles/IngredientsCreateRecipe.css";


function IngredientsCreateRecipe() {
    // Store multiple ingredients in an array
    const [ingredients, setIngredients] = useState([
        { id: 1, name: "", amount: "", note: "" }
    ]);

    // add more ingredient input fields
    const addMoreIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), name: "", amount: "", note: "" }]);
    };

    // update the ingredient state
    const handleInputChange = (id, field, value) => {
        setIngredients(
            ingredients.map((ingredient) =>
                ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
            )
        );
    };

    return (
        <div className="ingredients-container">  
            {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="ingredients-container1">
                    <input
                        type="text"
                        value={ingredient.name}  
                        onChange={(e) => handleInputChange(ingredient.id, "name", e.target.value)}
                        className="IngredientName"
                        placeholder="Ingredient Name"
                    />

                    <input
                        type="text"
                        value={ingredient.amount} 
                        onChange={(e) => handleInputChange(ingredient.id, "amount", e.target.value)}
                        className="NumberOfIngredient"
                        placeholder="Amount"
                    />

                    <input
                        type="text"
                        value={ingredient.note}  
                        onChange={(e) => handleInputChange(ingredient.id, "note", e.target.value)}
                        className="note"
                        placeholder="Note"
                    />
                </div>
            ))}

            <button onClick={addMoreIngredient} className="add-more-btn">
                Add More Ingredient
            </button>
        </div>
    );
}

export default IngredientsCreateRecipe;
