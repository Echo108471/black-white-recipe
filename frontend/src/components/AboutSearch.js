import React, { useState } from 'react';
import '../styles/AboutSearch.css';
import SearchIcon from "../assets/searchicon.svg"
import fridge from "../assets/fridge.svg"
import v from "../assets/v.svg"
import { useNavigate } from 'react-router-dom';


const AboutSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const popularKeywords = ['Egg', 'Egg1', 'Egg2', 'Egg3', 'Egg4', 'Egg5', 'Egg6', 'Egg7'];

  // 재료 추가 함수 (중복 방지)
  const addIngredient = (item) => {
    if (item.trim() !== '' && !ingredients.includes(item.trim())) {
      setIngredients([...ingredients, item.trim()]);
    }
  };

  // 입력창에서 엔터로 추가
  const handleAddIngredient = (e) => {
    e.preventDefault();
    addIngredient(input);
    setInput('');
  };

  // 삭제 함수
  const handleDelete = (item) => {
    setIngredients(ingredients.filter(i => i !== item));
  };

  // 검색
const navigate = useNavigate();

const handleSearchRecipes = () => {
  if (ingredients.length === 0) {
    alert("Please add some ingredients first!");
    return;
  }
  navigate(`/recipes?ingredients=${ingredients.join(',')}`);
};

return (
  <div className="search-wrapper-about">
    {isOpen && <div className="blur-overlay-about"></div>}
    
    <button className="search-toggle-about" onClick={() => setIsOpen(!isOpen)}>
    <span>Start with Your Ingredients</span>
    </button>

    <div className={`search-bar-about ${isOpen ? 'open' : ''}`}>
        <div className="close-btn-about" onClick={() => setIsOpen(false)}>
        <img src={v} alt="v" className="v-about" />
      </div>

      <form onSubmit={handleAddIngredient}>
        <input 
          type="text"
          className="searching-about"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add more items"
        />
        <img src={SearchIcon} alt="searchicon" className="searchI-about" />
      </form>

      <div className="popular-keywords-about">
        <ul>
          {popularKeywords.map((item, idx) => (
            <li key={idx} onClick={() => addIngredient(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="inmyfridge-about">
        <img src={fridge} alt="fridge" className="fridge-about" />
        <h4>In My Fridge</h4>
        <ul>
          {ingredients.map((item, idx) => (
            <li key={idx}>
              {item}
              <button className="delete-btn-about" onClick={() => handleDelete(item)}>x</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={"cook-button-about"}>
        <button onClick={handleSearchRecipes}>Let's Go Cook!</button>
      </div>
    </div>
  </div>
);
};

export default AboutSearch;
