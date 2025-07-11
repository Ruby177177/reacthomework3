import React from 'react';
import './Header.css';

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Shoe Shop</h1>
        <div className="cart-icon" onClick={onCartClick}>
          <span className="cart-symbol">🛒</span>
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
}

export default Header; 