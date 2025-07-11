import React from 'react';
import './ShoeList.css';

function ShoeList({ shoes, onAddToCart, onViewDetail }) {
  return (
    <div className="shoe-list">
      <h2>Our Shoes</h2>
      <div className="shoes-grid">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="shoe-card">
            <img src={shoe.image} alt={shoe.name} className="shoe-image" />
            <div className="shoe-info">
              <h3>{shoe.name}</h3>
              <p className="shoe-price">${shoe.price}</p>
              <p className="shoe-description">{shoe.description}</p>
              <div className="shoe-actions">
                <button 
                  className="btn btn-detail"
                  onClick={() => onViewDetail(shoe.id)}
                >
                  View Detail
                </button>
                <button 
                  className="btn btn-add-cart"
                  onClick={() => onAddToCart(shoe.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoeList; 