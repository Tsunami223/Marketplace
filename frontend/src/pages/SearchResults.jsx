import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?search=${query}`);
        setProducts(response.data);
        
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    if (query) {
      fetchFilteredProducts();
    }
  }, [query]);

  return (
    <Container className="mt-5 bg-white w-50 rounded-4">
      <h2>Search Results for "{query}"</h2>
      <Row>
        {products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())).map((product) => (
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

export default SearchResults;
