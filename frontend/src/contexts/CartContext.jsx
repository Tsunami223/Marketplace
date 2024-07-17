import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(initialCart);
  const navigate = useNavigate();


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const emptyCart = () => {
    setCart([]);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem === item.size
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...item, quantity: item.quantity }];
        saveCartToLocalStorage(updatedCart);
        return updatedCart;      }
    });

    alert(`${item.name} taglia ${item.size} è stato aggiunto al carrello!`);
    navigate('/shop');
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item._id !== productId);
    setCart(newCart);
    console.log("eliminato" + productId);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
