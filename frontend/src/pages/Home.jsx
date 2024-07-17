import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import Newsletter from '../components/Newsletter';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    console.log(handleSubscribe);
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/newsletter', { email });
      alert(`Grazie per esserti iscritto alla newsletter con l'indirizzo: ${email}`);
      setEmail('');
  }
  catch (error) {
    console.error('Error subscribing to newsletter:', error);
    alert('Errore durante l\'iscrizione alla newsletter. Riprova più tardi.');
  }
}

  return (
      // Componente Home con carousel di immagini e bottone per navigare al negozio
      <div className="home">
        <section className="hero">
          <div className="hero-content d-flex flex-column align-items-center bg-white rounded-4 mt-5 m-auto w-50 p-4 ">
            <img src="/logo.png" alt="Logo del sito" className="logo rounded-circle h-25 w-25" />
            <h1>Benvenuto nel nostro negozio di moda!</h1>
            <p>Scopri le ultime tendenze e acquista articoli di moda di alta qualità.</p>
            <Link to="/shop" className="btn btn-danger">Esplora il Negozio</Link>
          </div>
        </section>
        <section className="product-carousel mt-5 d-flex flex-column align-items-center bg-white m-auto w-25 p-4 rounded-4" style={{ height: '600px' }}>
          <h2>Prodotti in Vetrina</h2>
          <Carousel className='p-3 text-center'>
            {products.map((product) => (
              <Carousel.Item key={product._id}>
                <img
                  className="d-block w-100 carousel-image"
                  src={product.imageUrl}
                  alt={`Slide of ${product.name}`}
                  />
                <Carousel.Caption className='p-4 mt-5 text-black align-align-items-baseline'>
                <Link to="/shop" className="btn btn-primary ml mb-3">Vedi tutti i Prodotti</Link>
                  <Button as={Link} to={`/product/${product._id}`} variant="danger">Acquista Ora</Button>
                  </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
        <Newsletter
          email={email}
          onEmailChange={handleEmailChange}
          onSubscribe={handleSubscribe} />
      </div>
  );
};

export default Home;
