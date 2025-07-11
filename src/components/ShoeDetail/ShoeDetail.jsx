import React, { useState } from 'react';
import './ShoeDetail.css';

function ShoeDetail({ shoe, onAddToCart, onBuyNow, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add multiple items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      onAddToCart(shoe.id);
    }
    onClose();
  };

  const handleBuyNow = () => {
    // Add to cart and proceed to checkout (for now just add to cart)
    handleAddToCart();
    alert('Proceeding to checkout...');
  };

  if (!shoe) return null;

  return (
    <div className="shoe-detail-overlay">
      <div className="shoe-detail-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="shoe-detail-content">
          <div className="shoe-detail-image">
            <img src={shoe.image} alt={shoe.name} />
          </div>
          
          <div className="shoe-detail-info">
            <h2>{shoe.name}</h2>
            <p className="shoe-detail-price">${shoe.price}</p>
            <p className="shoe-detail-description">{shoe.description}</p>
            
            <div className="quantity-controls">
              <label>Quantity:</label>
              <div className="quantity-buttons">
                <button 
                  className="quantity-btn"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="total-price">
              <strong>Total: ${shoe.price * quantity}</strong>
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn btn-add-cart"
                onClick={handleAddToCart}
              >
                Add to Cart ({quantity})
              </button>
              <button 
                className="btn btn-buy-now"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoeDetail; 