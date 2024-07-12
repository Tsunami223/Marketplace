import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { Chart, registerables } from 'chart.js';
import Newsletter from '../components/Newsletter';

Chart.register(...registerables);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [priceHistory, setPriceHistory] = useState([]);
  const { addToCart } = useContext(CartContext);
  const chartRef = useRef(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setPriceHistory(response.data.priceHistory || []); 
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity, () => {
      alert(`Il prodotto ${product.name} quantity ${quantity} è stato aggiunto al carrello`);
    });
  };

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }

    const ctx = document.getElementById('priceHistoryChart').getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: priceHistory.map(entry => new Date(entry.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Price History',
            data: priceHistory.map(entry => entry.price),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      },
    });

    chartRef.current = chartInstance;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [priceHistory]);

  return (
    <section>
      <Container className="mt-5 bg-white rounded-4 p-4 m-auto h-100">
        <Row>
          <Col md={6}>
            <Card.Img src={product.imageUrl} />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>€{product.price}</Card.Text>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantità</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                />
              </Form.Group>
                <canvas id="priceHistoryChart" ref={chartRef}></canvas>
              <Button className="mt-3 m-auto" variant="primary" onClick={handleAddToCart}>
                Aggiungi al Carrello 🛒
              </Button>
              <div className="mt-4">
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>
  );
};

export default ProductDetail;
