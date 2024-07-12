import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    bankAccountName: '',
    bankIBAN: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui puoi gestire la logica del pagamento, ad esempio inviare i dati ad un server
    alert('Pagamento completato con successo');
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'creditCard':
        return (
          <>
            <Form.Group controlId="cardNumber">
              <Form.Label>Numero di Carta</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                required
                maxLength={16}
              />
            </Form.Group>
            <Form.Group controlId="expiryDate">
              <Form.Label>Data di Scadenza</Form.Label>
              <Form.Control
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="cvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                required
                maxLength={3}
              />
            </Form.Group>
          </>
        );
      case 'paypal':
        return (
          <Form.Group controlId="paypalEmail">
            <Form.Label>Email PayPal</Form.Label>
            <Form.Control
              type="email"
              name="paypalEmail"
              value={paymentDetails.paypalEmail}
              onChange={handleChange}
              required
            />
          </Form.Group>
        );
      case 'bankTransfer':
        return (
          <>
            <Form.Group controlId="bankAccountName">
              <Form.Label>Nome del Titolare</Form.Label>
              <Form.Control
                type="text"
                name="bankAccountName"
                value={paymentDetails.bankAccountName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="bankIBAN">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                name="bankIBAN"
                value={paymentDetails.bankIBAN}
                onChange={handleChange}
                required
                maxLength={27}
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="mt-5 bg-white rounded-4 p-4">
      <h2>Metodo di Pagamento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="paymentMethod">
          <Form.Label>Seleziona il metodo di pagamento</Form.Label>
          <Form.Control as="select" value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="creditCard">Carta di Credito</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bonifico Bancario</option>
          </Form.Control>
        </Form.Group>
        {renderPaymentForm()}
        <Button variant="primary" type="submit" className="mt-3">Paga Ora</Button>
      </Form>
    </Container>
  );
};

export default Payment;
