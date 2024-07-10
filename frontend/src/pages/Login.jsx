import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implementa la logica di autenticazione qui (es. chiamata API, verifica credenziali)
    console.log('Username:', username);
    console.log('Password:', password);
    // Resetta i campi dopo il login
    setUsername('');
    setPassword('');
  };

  return (
    <Container className="mt-5 bg-white rounded-4 p-4 w-25">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
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
