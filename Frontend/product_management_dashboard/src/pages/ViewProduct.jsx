import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/SideBar";
import axios from "axios";

const ViewProduct = () => {
  const [query, setQuery] = useState("");
  const [filterCategories, setFilterCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Handle Search
  const handleSearch = (query) => {
    setQuery(query);
  };
  const truncateDescription = (description, maxLines) => {
    if (!description) return "";
    const maxChars = maxLines * 50;
    return description.length > maxChars
      ? description.substring(0, maxChars) + "..."
      : description;
  };

  // Handle Filter Change
  const handleFilterChange = (selectedCategories) => {
    setFilterCategories(selectedCategories);
  };

  // Update filtered products based on search and category filters
  useEffect(() => {
    let updatedProducts = products;

    // Filter by categories if selected
    if (filterCategories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        filterCategories.includes(product.category)
      );
    }

    // Filter by search query
    if (query.trim()) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [query, filterCategories, products]);

  return (
    <div className="productView">
      <Sidebar categories={categories} onFilterChange={handleFilterChange} />
      <div className="contentArea">
        <SearchBar onSearch={handleSearch} />
        <div className="row row-cols-1 row-cols-md-3 g-4" id="productList">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard
                title={product.title}
                price={product.price}
                description={truncateDescription(product.description, 2)}
                image={product.image || "https://via.placeholder.com/150"}
                id={product.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
