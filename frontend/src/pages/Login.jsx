import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try { const response = await axios.post('http://localhost:5000/login', {
      
      email,
      password,
    });
    const { data } = response
 
    if (data.token) {
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/admin/dashboard');
    } else {
      setError('Errore durante il login');
    }
  } catch (error) {
    console.error('Errore durante il login:', error);
    setError('Credenziali non valide');
  }
};

  return (
    <Container className="mt-5 bg-white rounded-4 p-4 w-25">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formMail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
