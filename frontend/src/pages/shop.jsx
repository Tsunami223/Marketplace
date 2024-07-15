import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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
      <div className="category-filter">
        <label htmlFor="category-select"></label>
        <select
        style={{backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', marginLeft: '15px'}}
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Tutti</option>
          <option value="abbigliamento">Abbigliamento</option>
          <option value="accessori">Accessori</option>
          <option value="scarpe">Scarpe</option>
        </select>
      </div>
      {products && <ProductList products={products} selectedCategory={selectedCategory} />}
    </div>
  );
};

export default Shop;
