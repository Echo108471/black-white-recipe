import React, { useState } from "react";
import "../styles/SearchBox.css";
import SearchingIcon from "../assets/searchingicon.svg";

const dummyPopularSearches = ["chicken", "cookies", "lasagna", "pancakes", "pasta", "salad", "steak"]; // dummy 

function SearchBox() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // auto enter if you click pop searches
    const handlePopularSearchClick = (query) => {
        setSearchQuery(query);
    };

    const handleSearchClick = () => {
        if (searchQuery.trim() !== "") {
            console.log(`🔍 Searching for: ${searchQuery}`);
        }
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
