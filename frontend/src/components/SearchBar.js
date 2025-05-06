import React, { useState } from "react";
import "../styles/SearchBar.css"; 
import SearchBackgound from "../assets/searchbackground.svg"
import SearchIcon from "../assets/searchicon.svg"

const SearchBar = ({ data = [] }) => { // ✅ 기본값 빈 배열 설정
const [searchTerm, setSearchTerm] = useState("");

const handleSearch = (event) => {
    setSearchTerm(event.target.value);
};

const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()) 
);

return (
    <div className="search-container">
        {/* <img src={SearchBackgound} alt="searchbackground" className="searchbackground" />*/}
    <input
        type="text"
        //placeholder="Search by Ingredients"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
    />
    <img src={SearchIcon} alt ="searchicon" className="searchIcon"></img>
    </div>
    );
};

export default SearchBar; // ✅ 올바르게 export default 적용
