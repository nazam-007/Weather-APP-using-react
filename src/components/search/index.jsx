import React from "react";

export default function Search({ search, setSearch,handleSearch }) {
    return (
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      );
}
