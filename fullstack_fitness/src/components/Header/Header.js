import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for making HTTP requests
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userId = "1"; // Replace with the actual userId

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      // Send a POST request to the logout endpoint
      await axios.post('http://localhost:5001/api/users/logout');
      // Clear local storage
      localStorage.clear();
      console.log('Local storage cleared.');
      // Redirect or perform other client-side actions as needed
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error, show message, etc.
    }
  };
  
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#a9a9a9' }}>
      <Container>
        <Navbar.Brand as={Link} to={`/home/${userId}`} className='title'><FontAwesomeIcon icon={faDumbbell}/> FullStack Fitness</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to={`/profile/${userId}`} className='link' id="route">Profile</Nav.Link>
            <Nav.Link href="/workout" className='link'>Workouts</Nav.Link>
            <Nav.Link href="/workout-creation" className='link'>Create A Workout</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/" className='link' onClick={(e) => handleLogout(e)}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
