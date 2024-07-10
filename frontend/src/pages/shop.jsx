import React from 'react';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
  <div>
    <h1>Shop</h1>
    {products && <ProductList products={products}/>}
  </div>
);
}

export default Shop;
