import React, { createContext, useState, useEffect } from 'react';

// Créer le contexte du panier
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Sauvegarder le panier dans le localStorage
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  };

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Ajouter un article au panier et sauvegarder dans localStorage
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
    }
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Supprimer un article du panier
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Mettre à jour la quantité d'un article dans le panier
  const updateQuantityInCart = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantityInCart }}>
      {children}
    </CartContext.Provider>
  );
};
