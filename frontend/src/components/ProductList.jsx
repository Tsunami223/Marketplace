import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = ({products}) => {



  return (
    <Container>
      <Row>
        {products && products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Card.Img src={product.imageUrl} variant="top" />
              <Card.Body>
                <Card.Title as="div">
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="div">
                  {product.description}
                </Card.Text>
                <Card.Text as="h3">€{product.price}</Card.Text>
                <Button as={Link} to={`/product/${product._id}`} variant="primary">
                  View Details
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
