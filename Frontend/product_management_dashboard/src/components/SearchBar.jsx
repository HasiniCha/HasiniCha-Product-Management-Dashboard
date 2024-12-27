import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setquery] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setquery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search for products..."
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
