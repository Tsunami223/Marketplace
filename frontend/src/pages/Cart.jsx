import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';




const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
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
              <th>Quantità</th>
              <th>Nome</th>
              <th>Prezzo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price} €</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemove(product.id)}>Rimuovi</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
                  <Button variant="primary" onClick={handleCheckout} className="mt-3">Checkout</Button>
                  </>
      )}
    </Container>
  );
};

export default Cart;
