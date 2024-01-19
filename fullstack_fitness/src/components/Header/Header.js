import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for making HTTP requests
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axios.post('http://localhost:49146/api/users/logout');
      // Redirect or perform other client-side actions as needed
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error, show message, etc.
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'black' }}>
      <Container>
        <Navbar.Brand href="#home" className='title'><FontAwesomeIcon icon={faDumbbell} style={{color:'rgb(168, 14, 14)'}}/> FullStack Fitness</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features" className='link' id="route">Profile</Nav.Link>
            <Nav.Link href="#pricing" className='link'>Workouts</Nav.Link>
            <Nav.Link href="#pricing" className='link'>Create A Workout</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/" className='link' onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
