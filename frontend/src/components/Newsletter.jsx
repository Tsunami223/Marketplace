import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/newsletter', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('Errore durante l\'iscrizione alla newsletter. Riprova più tardi.');
    }
  };

  return (
    <Container className="mt-5 w-25 d-flex flex-column align-items-center bg-white rounded-4 p-4">
      <h2>Iscriviti alla nostra Newsletter</h2>
      <Form className='d-flex flex-column m-auto' onSubmit={handleSubscribe}>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="danger" type="submit" className="mt-3">
          Iscriviti
        </Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </Container>
  );
};

export default Newsletter;

