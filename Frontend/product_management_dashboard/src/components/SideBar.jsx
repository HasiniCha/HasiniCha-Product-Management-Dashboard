import React, { useState } from "react";
import "../App.css";

const Sidebar = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories);
  };

  return (
    <div
      id="sidebar"
      className="sidebar bg-light p-3"
      style={{ width: "250px" }}
    >
      <h5>Filter by Categories</h5>
      <ul className="list-group">
        {categories.map((category) => (
          <li
            key={category}
            className="list-group-item"
            onClick={() => handleCategoryChange(category)}
            style={{ cursor: "pointer" }}
          >
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              style={{ marginRight: "10px" }}
            />
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
