import React, { useState } from 'react';
import '../styles/SearchNav.css';
import SearchIcon from "../assets/searchicon.svg"
import fridge from "../assets/fridge.svg"
import v from "../assets/v.svg"
import { useNavigate } from 'react-router-dom';


const SearchNav = ({ variant }) => {
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
    <div className="search-wrapper">
      {isOpen && <div className="blur-overlay"></div>}
      
      <button className="search-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img src={SearchIcon} alt="searchicon" className="searchIcon" />
      </button>

      <div className={`search-bar ${isOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={() => setIsOpen(false)}>
          <img src={v} alt="v" className="v" />
        </div>

        <form onSubmit={handleAddIngredient}>
          <input 
            type="text"
            className="searching"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add more items"
          />
          <img src={SearchIcon} alt="searchicon" className="searchI" />
        </form>

        <div className="popular-keywords">
          <ul>
            {popularKeywords.map((item, idx) => (
              <li key={idx} onClick={() => addIngredient(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="inmyfridge">
          <img src={fridge} alt="fridge" className="fridge" />
          <h4>In My Fridge</h4>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>
                {item}
                <button className="delete-btn" onClick={() => handleDelete(item)}>x</button>
              </li>
            ))}
          </ul>
        </div>

        <div className={`cook-button ${variant === 'about' ? 'about-style' : ''}`}>
          <button onClick={handleSearchRecipes}>Let's Go Cook!</button>
        </div>
      </div>
    </div>
  );
};

export default SearchNav;
