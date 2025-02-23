import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Recipes from "./components/Recipes";
import Ingredients from "./components/Ingredients";
import Home from "./components/Home";
import Ranking from "./components/Ranking";

function App() {
  return (
    <Router> {/* ✅ Router로 감싸기 */}
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;
