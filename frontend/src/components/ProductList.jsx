import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = ({ products, selectedCategory }) => {
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <Container>
      <Row className='g-4'>
        {filteredProducts.map(product => (
          <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
            <Card className="my-3 p-3 rounded-4 w-100 h-100" style={{ maxHeight: '650px' }}>
              <Card.Img src={product.imageUrl} variant="top" style={{ height: '500px', objectFit: 'contain', width: '100%', maxHeight: '300px'}} />
              <Card.Body>
                <Card.Title as="div">
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="div">
                  {product.description}
                </Card.Text>
                <Card.Text className='pt-2' as="h5">Categoria: {product.category}</Card.Text>
                <Card.Text as="h3">€{product.price}</Card.Text>
                <Button className='mt-4' as={Link} to={`/product/${product._id}`} variant="primary">
                  Dettagli
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
