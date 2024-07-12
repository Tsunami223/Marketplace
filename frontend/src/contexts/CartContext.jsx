import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === item.id);
            if (existingProduct) {
              return prevCart.map(item =>
                item.id === item.id ? { ...item, quantity: item.quantity + 1 } : item
              );
            } else {
              return [...prevCart, { ...item, quantity: 1 }];
            }
          });
          alert(`${item.name} è stato aggiunto al carrello!`);
        };
        const removeFromCart = (productId) => {
          setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        };
      

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};