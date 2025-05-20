import React, { useState } from "react";
import "../styles/SearchBox.css";
import SearchingIcon from "../assets/searchingicon.svg";
import { useNavigate } from "react-router-dom";

const dummyPopularSearches = ["chicken", "cookies", "lasagna", "pancakes", "pasta", "salad"]; // dummy 

function SearchBox() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // auto enter if you click pop searches
    const navigate = useNavigate();
    const handleSearchClick = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handlePopularSearchClick = (query) => {
        setSearchQuery(query);
        navigate(`/recipes?search=${encodeURIComponent(query)}`);
    };

    return (
        <div className="search-container-1">
            <div className="search-header">
                <h2>What would you like to cook?</h2>
                <h2>Popular searches</h2>
            </div>
            <div className="searches">
                <div className="searchbox">
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                        //placeholder="Search for a recipe..."
                    />
                    <img 
                        src={SearchingIcon} 
                        alt="Search Icon" 
                        className="SearchingIcon"
                        onClick={handleSearchClick} 
                    />
                </div>


                <div className="popular-searches">
                    {dummyPopularSearches.map((item, index) => (
                        <button 
                            key={index} 
                            className="popular-btn"
                            onClick={() => handlePopularSearchClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchBox;
