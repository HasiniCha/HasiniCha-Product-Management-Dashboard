import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "../App.css";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching product with ID:", id);
    if (id) {
      axios
        .get(`http://localhost:8081/api/products/${id}`)
        .then((response) => {
          // On successful fetch, store the product data and stop loading
          console.log("Product data fetched:", response.data);
          setProduct(response.data);
          setError(null);
          setLoading(false);
        })
        .catch((err) => {
          // Handle errors in fetching product data
          setError("Failed to fetch product details.");
          setLoading(false);
          console.error("Error fetching product details:", err);
        });
    }
  }, [id]);

  useEffect(() => {
    // Log product data whenever it gets updated (useful for debugging)
    if (product) {
      console.log("Product updated:", product);
    }
  }, [product]);

  // Handle product deletion
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8081/api/products/${id}`)
      .then(() => {
        // On success, show success message and navigate back to products list
        console.log("Product deleted");
        toast.success("Product deleted successfully!");
        navigate("/products");
      })
      .catch((error) => {
        // Handle errors in product deletion
        console.error("Error deleting product:", error);
        toast.error("Could not delete product. Please try again later.");
        setError("Could not delete product. Please try again later.");
      });
  };

  // Navigate to the edit page for the current product
  const handleEdit = () => {
    navigate(`/editProduct/${id}`, { state: { product, edit: true } });
  };

  // Navigate back to the product list
  const handleBack = () => {
    navigate("/products");
  };

  // Error handling: display error message if fetching fails
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={handleBack}>
          Back to Products
        </Button>
      </Container>
    );
  }

  // Loading state: show loading spinner while product data is being fetched
  if (loading) {
    return (
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading product details...</p>
      </Container>
    );
  }

  // If product is not found, display a message
  if (!product) {
    return <p>Product not found</p>;
  }

  // Render product details once data is available
  return (
    <Container className="mt-4">
      <Card className="product-details-card">
        <Row>
          <Col md={6} sm={12} className="image-col">
            {/* Display product image */}
            <Card.Img variant="top" src={product.image} />
          </Col>
          <Col md={6} sm={12} className="details-col">
            <div>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div>
                <strong>Price:</strong> ${product.price}
              </div>
              <div>
                <strong>Category:</strong> {product.category}
              </div>
              <div>
                <strong>Rating:</strong> {product.rating} ★
              </div>
              <div className="d-flex justify-content-between mt-3">
                {/* Button to go back to product list */}
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  className="me-3"
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </Button>
                {/* Button to navigate to the edit page */}
                <Button variant="primary" onClick={handleEdit} className="me-3">
                  <FaEdit className="me-2" />
                  Edit
                </Button>
                {/* Button to delete the product */}
                <Button variant="danger" onClick={handleDelete}>
                  <FaTrash className="me-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductDetails;
