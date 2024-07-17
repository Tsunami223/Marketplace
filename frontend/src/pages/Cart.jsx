import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, emptyCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    const confirmed = window.confirm('Sei sicuro di voler rimuovere questo articolo dal carrello?');
    if (confirmed) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    navigate('/shipping');
  };

  const handleEmptyCart = () => {
    const confirmed = window.confirm('Sei sicuro di voler svuotare il carrello?');
    if (confirmed) {
      emptyCart();
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <Container className="mt-5 bg-white rounded-4 p-4">
      <h2>Carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantità</th>
                <th>Taglia</th>
                <th>Prezzo</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={`${product.id}-${product.size}`}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.size}</td>
                  <td>{product.price} €</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemove(product._id)}>
                      Rimuovi
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3"></td>
                <td><strong>Totale:</strong></td>
                <td><strong>{calculateTotal()} €</strong></td>
              </tr>
            </tbody>
          </Table>
          <Button variant="danger" onClick={handleCheckout} className="mt-3">
            Checkout
          </Button>
          <Button variant="primary" onClick={handleEmptyCart} className="mt-3 ms-3">
            Svuota Carrello
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
