import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
const CustomNavbar = () => (
  <Navbar variant='dark' expand="lg" className="m-3 p-2 rounded-2 fs-4">
    <Navbar.Brand as={Link} to="/">
        <img
          src= "/logo.png"
          width="65"
          height="65"
          className="d-inline-block align-top bg-light rounded-5 "
          alt="Logo"
          />
          </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto fw-bolder">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
      </Nav>
      <Form className=" d-flex ml-auto gap-2">
      <Link to= "/login" className= "btn btn-danger align-content-center" >Login</Link>
      <Link to= "/register" className= "btn btn-primary align-content-center" >Register</Link>

        <FormControl type="text" placeholder="Search" className="mr-sm-2 d-flex justify-self-end ml-auto p-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

export default CustomNavbar;
