import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const sortedProducts = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    // Filtraggio per categoria
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    // Filtraggio per prezzo
    if (minPrice && Number(product.price) < Number(minPrice)) {
      return false;
    }
    if (maxPrice && Number(product.price) > Number(maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div className="d-flex">
      <div className="p-3">
        <div className="category-filter">
          <label htmlFor="category-select"></label>
          <select
            style={{ backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', width: '200px' }}
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Tutti</option>
            <option value="Abbigliamento">Abbigliamento</option>
            <option value="Accessori">Accessori</option>
            <option value="Scarpe">Scarpe</option>
          </select>
        </div>
        <div className="price-filter mt-3" style={{ backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', width: '200px', padding: '5px' }}
        >
          <label className="mt-2 mb-2" htmlFor="min-price">Prezzo Min:</label>
          <input 
            type="number"
            id="min-price"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min"
            style={{ marginLeft: '8px', width: '100px' }}
          />
          <label className="mt-2 mb-2" htmlFor="max-price">Prezzo Max:</label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max"
            style={{ marginLeft: '5px', width: '100px' }}
          />
        </div>
      </div>
      <div className="flex-grow-1">
        {products && <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
};

export default Shop;
