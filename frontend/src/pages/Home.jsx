import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import Newsletter from '../components/Newsletter';



const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
      // Componente Home con carousel di immagini e bottone per navigare al negozio
      <div className="home">
        <section className="hero">
          <div className="hero-content d-flex flex-column align-items-center bg-white rounded-4 mt-5 m-auto w-50 p-5">
          <img  src="/logo.png" alt="Logo del sito" className="logo rounded-circle h-25 w-25" />
            <h1>Benvenuto nel nostro negozio di moda!</h1>
            <p>Scopri le ultime tendenze e acquista articoli di moda di alta qualità.</p>
            <Link to="/shop" className="btn btn-danger">Esplora il Negozio</Link>
          </div>
        </section>
        <section className="product-carousel mt-5 d-flex flex-column align-items-center bg-white m-auto w-50 p-4 rounded-4">
        <h2>Prodotti in Vetrina</h2>
        <Carousel className='p-3'>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <img
                className="d-block w-100"
                src={product.imageUrl}
                alt={`Slide of ${product.name}`}
              />
              <Carousel.Caption>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Button as={Link} to={`/product/${product._id}`} variant="light">Acquista Ora</Button>
              </Carousel.Caption>
              <Link to="/shop" className="btn btn-danger">Vedi tutti i Prodotti</Link>
            </Carousel.Item>

          ))}
        </Carousel>
      </section>
      <Newsletter/>
      </div>
    );
  };

export default Home;
