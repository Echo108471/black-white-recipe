import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Recipes from "./Recipes";
import Ingredients from "./components/Ingredients";
import Home from "./components/Home";
import Ranking from "./components/Ranking";
import SearchBar from "./components/SearchBar";


function App() {
  const [ingredients, setIngredients] = useState([]); //  상태 변수명 수정
  const [newIngredient, setNewIngredient] = useState("");

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient]); //  `data` → `ingredients`
      setNewIngredient(""); 
    }
  };

  return (
    <Router> 
      <Header />
      <div className = "header2">
        <NavBar/> 
        <SearchBar data={ingredients} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>

      {/*<div className="input-container">
        <input 
          type="text" 
          value={newIngredient} 
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Add an ingredient"
        />
        <button onClick={addIngredient}>Add</button>
  </div>*/}
    </Router>
  );
}

export default App;
