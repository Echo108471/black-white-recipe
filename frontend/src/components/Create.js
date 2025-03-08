import React, { useState } from "react";
import "../styles/Create.css";
import IngredientsCreateRecipe from "./IngredientsCreateRecipe"; 
import AddSteps from "./AddSteps";

function Create() {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeInfo, setRecipeInfo] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [serving, setServing] = useState("1");
    const [time, setTime] = useState("5");
    const [difficulty, setDifficulty] = useState("Easy");

    const [ingredients, setIngredients] = useState([
        { id: 1, name: "", amount: "", note: "" }
    ]);

    const addMoreIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), name: "", amount: "", note: "" }]);
    };

    const handleInputChange = (id, field, value) => {
        setIngredients(
            ingredients.map((ingredient) =>
                ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
            )
        );
    };

    return (
        <div className="createrecipe-container"> 
            <div className="RecipeInformation">
                <div className="recipetitle">
                    <h2>Recipe Title</h2>
                    <input
                        type="text"
                        value={recipeTitle}
                        onChange={(e) => setRecipeTitle(e.target.value)}
                        className="titletext"
                    />
                </div>

                <div className="recipeinfo">
                    <h2>Recipe Introduction</h2>
                    <input
                        type="text"
                        value={recipeInfo}
                        onChange={(e) => setRecipeInfo(e.target.value)}
                        className="infotext"
                    />
                </div>

                <div className="introduction">
                    <h2>Introduction</h2>
                    <input
                        type="text"
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        className="introtext"
                    />
                </div>

                <div className="information">
                    <h2>Information</h2>
                    <h3>Servings</h3>
                    <select value={serving} onChange={(e) => setServing(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6+">6+</option>
                    </select>

                    <h3>Total Time</h3>
                    <select value={time} onChange={(e) => setTime(e.target.value)}>
                        <option value="5">-5 minutes</option>
                        <option value="10">-10 minutes</option>
                        <option value="15">-15 minutes</option>
                        <option value="30">-30 minutes</option>
                        <option value="60">-60 minutes</option>
                        <option value="90">90+ minutes</option>
                    </select>

                    <h3>Difficulty</h3>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className="ingredients">
                <h2>Ingredients</h2>
                <IngredientsCreateRecipe 
                    ingredients={ingredients}
                    handleInputChange={handleInputChange}
                    addMoreIngredient={addMoreIngredient}
                />
                </div>
                </div>
                <div className="AddSteps-wrapper">
                <div className="AddSteps" >
                    <h2>Add Steps</h2>
                    <AddSteps/>
                </div>
            </div>
        </div>
    );
}

export default Create;
