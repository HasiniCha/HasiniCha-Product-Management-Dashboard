import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaPlusCircle, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <Container className="mt-5">
      <h2 className="AdminHeading">Admin Dashboard</h2>
      <Row className="mt-4">
        {/* Create Card */}
        <Col md={4} sm={10} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <FaPlusCircle size={40} className="card-icon" />
              <Card.Title>Create</Card.Title>
              <Card.Text>
                Create new products, categories, and more on this page.
              </Card.Text>
              <Button variant="primary" href="/createProduct">
                Go to Create
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* View Card */}
        <Col md={4} sm={12} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <FaEye size={40} className="card-icon" />
              <Card.Title>View</Card.Title>
              <Card.Text>View and manage product.</Card.Text>
              <Button variant="success" href="/products">
                Go to View
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {/* Edit/Delete Card */}
        <Col md={4} sm={12} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs="auto" className="pe-0">
                  <FaEdit size={40} className="card-icon" />
                </Col>
                <Col xs="auto" className="pe-0">
                  <FaTrashAlt size={40} className="card-icon delete-icon" />
                </Col>
              </Row>
              <Card.Title>Edit/Delete</Card.Title>
              <Card.Text>update and delete existing products .</Card.Text>
              <Button variant="warning" href="/products">
                Go to Edit/Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
