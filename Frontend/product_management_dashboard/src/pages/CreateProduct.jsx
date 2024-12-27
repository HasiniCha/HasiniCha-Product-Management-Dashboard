import React, { useState, useEffect } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
    rating: 0.0,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [updated, setUpdated] = useState(false);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:8081/api/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // If we are editing, pre-fill form with product details
    if (location.state?.product) {
      setProduct(location.state.product);
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = {};
    if (!product.title) newErrors.title = "Title is required.";
    else if (product.title.length < 3 || product.title.length > 50)
      newErrors.title = "Title must be between 3 and 50 characters.";

    if (!product.description)
      newErrors.description = "Description is required.";
    else if (
      product.description.length < 10 ||
      product.description.length > 200
    )
      newErrors.description =
        "Description must be between 10 and 200 characters.";

    if (!product.price || product.price <= 0)
      newErrors.price = "Price must be a valid positive number.";

    if (!product.category) newErrors.category = "Category is required.";

    if (!product.image && !location.state?.product?.image)
      newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Handle image upload if image is selected
    if (product.image && typeof product.image !== "string") {
      // If image is a file (for new images)
      try {
        const imageData = new FormData();
        imageData.append("file", product.image);
        imageData.append("upload_preset", "presetname");

        const imageResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/add the name/image/upload",
          imageData
        );
        // Set image URL from Cloudinary
        product.image = imageResponse.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
        return;
      }
    }

    // API call to create or update the product
    try {
      if (id) {
        // If id is present, update the product
        if (updated === false) {
          await axios.put(`http://localhost:8081/api/products/${id}`, product);
          toast.success("Product Updated Successfully!");
          setUpdated(true);
        }
      } else {
        if (created === false) {
          // If no id, create a new product
          await axios.post("http://localhost:8081/api/products", product);
          setCreated(true);
          toast.success("New Product Created Successfully!");
        }
      }

      // Navigate back to products list
      navigate("/products");
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error submitting the product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? "Edit Product" : "Create Product"}</h2>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={product.title}
            onChange={handleChange}
            maxLength="10"
            isInvalid={!!errors.title}
          />
          <Form.Text className="text-muted">
            Max length: 10 characters
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={product.description}
            onChange={handleChange}
            maxLength="100"
            isInvalid={!!errors.description}
          />
          <Form.Text className="text-muted">
            Max length: 100 characters
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={product.category}
            onChange={handleChange}
            isInvalid={!!errors.category}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
          {product.image && typeof product.image === "string" && (
            <img
              src={product.image}
              alt="Preview"
              className="product-image-preview"
            />
          )}
          {product.image && typeof product.image !== "string" && (
            <img
              src={URL.createObjectURL(product.image)}
              alt="Preview"
              className="product-image-preview"
            />
          )}
          <Form.Control.Feedback type="invalid">
            {errors.image}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3 float-end create-update-button"
        >
          {id ? "Update Product" : "Create Product"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProduct;
