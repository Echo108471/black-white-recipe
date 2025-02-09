import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Recipes from "./src/components/Recipes";
import Ingredients from "./src/components/Ingredients";
import Home from "./src/components/Home";
import Ranking from "./src/components/Ranking";

function NavBar() {
  return (
      <nav>
        <ul>
          <li><a href="/Recipes">Recipes</a></li>
          <li><a href="/Ingredients">Ingredients</a></li>
          <li><a href="/Home">Home</a></li>
          <li><a href="/Ranking">Ranking</a></li>
        </ul>
      </nav>
  );
}

export default NavBar;
