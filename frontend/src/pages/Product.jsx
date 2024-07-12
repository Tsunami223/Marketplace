import React, { useState } from 'react';
import ProductDetail from './ProductDetail';

const Product = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const cartItem= {
      id: product._id,
      name: product.name,
      price: product.price,
    };
    setCartItems(prevItems => [...prevItems, cartItem]);

  };

return (
  <div>
    <ProductDetail cartItems={cartItems} addToCart={addToCart} setCartItems={setCartItems} />
  </div>
   );
};

export default Product;
