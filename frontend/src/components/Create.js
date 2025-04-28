import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Create.css";
import IngredientsCreateRecipe from "./IngredientsCreateRecipe"; 
import AddSteps from "./AddSteps";
import Camera from "../assets/camera.svg";



function Create() {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeInfo, setRecipeInfo] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [serving, setServing] = useState("");
    const [time, setTime] = useState("");
    const [difficulty, setDifficulty] = useState("");

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

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));  // 미리보기용 URL 생성
        }
    };

    const navigate = useNavigate();

const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Unsaved changes will be lost.")) {
        navigate(-1);  // 이전 페이지로 이동
    }
};

const handleSave = () => {
    console.log("Recipe saved as draft!");
    alert("Recipe saved as draft!");
};

const handlePublish = () => {
    console.log("Recipe saved and published!");
    alert("Recipe saved and published!");
};



return (
    <section className="createrecipe-container"> 
        <div className="RecipeInformation">
            <div className="left">
            <div className="recipetitle">
                <h2>Recipe Title</h2>
                <input
                    type="text"
                    value={recipeTitle}
                    onChange={(e) => setRecipeTitle(e.target.value)}
                    className="titletext"
                    placeholder="    e.g.) Boiling Beef Seaweed Soup"
                />
            </div>

            <div className="recipeinfo">
                <h2>Recipe Introduction</h2>
                <textarea
                    value={recipeInfo}
                    onChange={(e) => setRecipeInfo(e.target.value)}
                    className="introtext"
                    placeholder={`Please describe the background story of how this recipe came to be. \ne.g.) I made beef seaweed soup to celebrate my husband's birthday.`}
                />
            </div>

                <div className="information">
                    <h2>Information</h2>
                    <select value={serving} onChange={(e) => setServing(e.target.value)}>
                        <option value="" disabled>Servings</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6+">6+</option>
                    </select>
                    <select value={time} onChange={(e) => setTime(e.target.value)}>
                    <option value="" disabled>Total Time</option>
                        <option value="5">-5 minutes</option>
                        <option value="10">-10 minutes</option>
                        <option value="15">-15 minutes</option>
                        <option value="30">-30 minutes</option>
                        <option value="60">-60 minutes</option>
                        <option value="90">90+ minutes</option>
                    </select>

                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="" disabled>Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    </div>
                    </div>
                    

                    <div className="image-upload">
                    <img src={Camera} alt="Camera" />
                        <input 
                            type="file" 
                            id="fileUpload" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            style={{ display: "none" }}
                        />

                        <label htmlFor="fileUpload" className="custom-upload-btn">Please upload a main photo of the dish</label>

                        {preview && (
                            <img src={preview} alt="Recipe Preview" className="preview-image"/>
                        )}
                </div>
                
                </div>
                <div className="AddSteps-wrapper">
                    <div className="ingredients">
                    <h2>Ingredient Information </h2>
                    <h3>💡 Please write the exact ingredient information so that there is no shortage of ingredients.</h3>
                    <IngredientsCreateRecipe 
                        ingredients={ingredients}
                        handleInputChange={handleInputChange}
                        addMoreIngredient={addMoreIngredient}
                    />
                    </div>
                    <div className="AddSteps" >
                        <h2>Recipe Instructions</h2>
                        <p>💡 Please write the important steps that influence the flavor of the dish clearly and without omission.<br></br>
                            e.g.) Marinate for 10 minutes ▷ Marinate lightly for 10 minutes.<br></br>
                            Garlic needs to be marinated ▷ Marinate garlic thoroughly to eliminate the spicy taste.
                            </p>
                        <AddSteps/>
                    </div>
                </div>
                <div className="button-group">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="publish-btn" onClick={handlePublish}>Save and Publish</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
        </section>
    );
}

export default Create;
