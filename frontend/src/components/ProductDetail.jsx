import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card.Img src={product.imageUrl} />
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>€{product.price}</Card.Text>
            <Button variant="primary">Add to Cart</Button>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
