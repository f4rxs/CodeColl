import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar navbar-dark" bg="dark" variant="dark">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          CodeColl
        </Navbar.Brand>

        {/* Toggler */}
        <Navbar.Toggle aria-controls="navbar-content" />

        {/* Collapsible content */}
        <Navbar.Collapse id="navbar-content">
          <Nav className="navbar-links me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/collaborate">Collaborate</Nav.Link>
            <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>

          {/* Right-aligned buttons */}
          <Nav className="navbar-actions ml-auto">
            <Nav.Link as={Link} to="/signin" className="login-button">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" className="signup-button">
              Get Started
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;