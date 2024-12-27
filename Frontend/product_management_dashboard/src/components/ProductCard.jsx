import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../App.css";

const ProductCard = ({ id, title, description, image, price }) => {
  return (
    <Card className="product-card">
      <Card.Img
        variant="top"
        src={image || "https://via.placeholder.com/150"}
        alt="Product"
        className="product-card-img"
      />
      <Card.Body>
        <Row>
          <Col xs={9}>
            <Card.Title>{title}</Card.Title>
          </Col>

          <Col xs={3} className="text-end">
            <p className="product-card-price">${price || "N/A"}</p>
          </Col>
        </Row>

        <Card.Text
          className="text-truncate"
          style={{ maxHeight: "3.6em", overflow: "hidden" }}
        >
          {description}
        </Card.Text>

        <Button
          as={Link}
          to={`/product/${id}`}
          variant="primary"
          className="product-card-btn"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
