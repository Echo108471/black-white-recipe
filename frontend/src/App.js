import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SearchNav from "./components/SearchNav";
import Home from "./components/Home";
import Ranking from "./components/Ranking";
import Recipes from "./components/Recipes";
import SearchBar from "./components/SearchBar";
import Create from "./components/Create";
import AddSteps from "./components/AddSteps";
import Footer from "./components/Footer";



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
    <div className="header">
        <Header />    
      <div className = "header2">
          <NavBar/> 
          <SearchNav />
      </div>
      <hr className="GrayLine1" />
    </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/create" element={<Create />} />
        <Route path="/add-steps" element={<AddSteps />} />
      </Routes>

      <Footer/> 
    </Router>
  );
}

export default App;
