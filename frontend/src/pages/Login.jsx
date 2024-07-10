import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try { const login = await axios.post('http://localhost:5000/login', {
      
      email,
      password,
    })
    if (login.data) {
      localStorage.setItem('token', login.data)
      navigate('/admin/dashboard')
    }    
    } catch (error) {
      setEmail('');
      setPassword('');
      
    }
  };

  return (
    <Container className="mt-5 bg-white rounded-4 p-4 w-25">
      <h2>Login</h2>
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
