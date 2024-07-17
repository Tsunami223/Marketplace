import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(''); 

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/newsletter', { email });
      setMessage(response.data.message);
      setVariant('success');
      setEmail(''); 
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('Errore durante l\'iscrizione alla newsletter. Riprova più tardi.');
      setVariant('danger');
    }
  };

  return (
    <Container className="mt-5 w-50 d-flex flex-column align-items-center bg-white rounded-4 p-4" style={{ maxWidth: '500px' }}>
      <h2 className='pb-3'>Iscriviti alla nostra Newsletter</h2>
      <Form className='d-flex flex-column w-100' onSubmit={handleSubscribe}>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="danger" type="submit" className="mt-3 align-self-center">
          Iscriviti
        </Button>
      </Form>
      {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
    </Container>
  );
};

export default Newsletter;
