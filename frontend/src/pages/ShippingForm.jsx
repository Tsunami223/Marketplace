import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShippingForm = () => {
  const [form, setForm] = useState({ address: '', city: '', postalCode: '', country: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ address: '', city: '', postalCode: '', country: '' });
    const shippingData = {
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      country: form.country,
    };
    localStorage.setItem('shippingData', JSON.stringify(shippingData));
    navigate('/payment');
  };

  return (
    <Container className="mt-5 bg-white rounded-4 p-4">
      <h2>Informazioni di Spedizione</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Indirizzo</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Città</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Codice Postale</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Paese</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Continua al Pagamento</Button>
      </Form>
    </Container>
  );
};

export default ShippingForm;
