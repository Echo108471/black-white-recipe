import React, { useState } from "react";
import "../styles/RecipeInformation.css";

function RecipeInformation() {
    // Define state variables
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeInfo, setRecipeInfo] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [information1, setInformation1] = useState("");
    const [information2, setInformation2] = useState("");
    const [information3, setInformation3] = useState("");
    const [servings1, setServings1] = useState("");
    const [servings2, setServings2] = useState("");
    const [servings3, setServings3] = useState("");
    const [totaltime1, setTotalTime1] = useState("");
    const [totaltime2, setTotalTime2] = useState("");
    const [totaltime3, setTotalTime3] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");

    return (
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
                <input
                    type="text"
                    value={information1}
                    className="info1"
                    onChange={(e) => setInformation1(e.target.value)}
                />
                <input
                    type="text"
                    value={information2}
                    className="info2"
                    onChange={(e) => setInformation2(e.target.value)}
                />
                <input
                    type="text"
                    value={information3}
                    className="info3"
                    onChange={(e) => setInformation3(e.target.value)}
                />
            </div>

            <div className="servings">
                <h2>Servings</h2>
                <input
                    type="text"
                    value={servings1}
                    className="servings1"
                    onChange={(e) => setServings1(e.target.value)}
                />
                <input
                    type="text"
                    value={servings2}
                    className="servings2"
                    onChange={(e) => setServings2(e.target.value)}
                />
                <input
                    type="text"
                    value={servings3}
                    className="servings3"
                    onChange={(e) => setServings3(e.target.value)}
                />
            </div>

            <div className="total-time">
                <h2>Total Time</h2>
                <input
                    type="text"
                    value={totaltime1}
                    className="totaltime1"
                    onChange={(e) => setTotalTime1(e.target.value)}
                />
                <input
                    type="text"
                    value={totaltime2}
                    className="totaltime2"
                    onChange={(e) => setTotalTime2(e.target.value)}
                />
                <input
                    type="text"
                    value={totaltime3}
                    className="totaltime3"
                    onChange={(e) => setTotalTime3(e.target.value)}
                />
            </div>

            <div className="difficulty">
                <h2>Difficulty</h2>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
        </div>
    );
}

export default RecipeInformation;
