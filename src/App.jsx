import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage.jsx';
import ShoeDetailPage from './pages/ShoeDetailPage/ShoeDetailPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';

function App() {
  // Cart state - object with shoe ID as key and quantity as value
  const [cart, setCart] = useState({});

  // Add to cart function
  const handleAddToCart = (shoeId) => {
    setCart(prevCart => ({
      ...prevCart,
      [shoeId]: (prevCart[shoeId] || 0) + 1
    }));
  };

  // Cart functions
  const handleUpdateQuantity = (shoeId, newQuantity) => {
    setCart(prevCart => ({
      ...prevCart,
      [shoeId]: newQuantity
    }));
  };

  const handleRemoveItem = (shoeId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[shoeId];
      return newCart;
    });
  };

  return (
    <Router>
              <div className="App">
          <Routes>
            {/* prettier-ignore */}
            <Route path="/" element={<HomePage cart={cart} onAddToCart={handleAddToCart} />} />
            {/* prettier-ignore */}
            <Route path="/product/:id" element={<ShoeDetailPage onAddToCart={handleAddToCart} /> } />
            {/* prettier-ignore */}
            <Route path="/cart" element={<CartPage cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App; 