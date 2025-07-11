import React from 'react';
import './ShoppingCart.css';

function ShoppingCart({ cart, shoes, onUpdateQuantity, onRemoveItem, onClose, isOpen }) {
  // Calculate total price
  const totalPrice = Object.entries(cart).reduce((total, [shoeId, quantity]) => {
    const shoe = shoes.find(s => s.id === parseInt(shoeId));
    return total + (shoe ? shoe.price * quantity : 0);
  }, 0);

  // Calculate total items
  const totalItems = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const handleIncreaseQuantity = (shoeId) => {
    onUpdateQuantity(shoeId, (cart[shoeId] || 0) + 1);
  };

  const handleDecreaseQuantity = (shoeId) => {
    const currentQuantity = cart[shoeId] || 0;
    if (currentQuantity > 1) {
      onUpdateQuantity(shoeId, currentQuantity - 1);
    } else {
      onRemoveItem(shoeId);
    }
  };

  const handleRemoveItem = (shoeId) => {
    onRemoveItem(shoeId);
  };

  if (!isOpen) return null;

  return (
    <div className="shopping-cart-overlay">
      <div className="shopping-cart-modal">
        <div className="cart-header">
          <h2>Shopping Cart ({totalItems} items)</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {totalItems === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="btn btn-primary" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {Object.entries(cart).map(([shoeId, quantity]) => {
                  const shoe = shoes.find(s => s.id === parseInt(shoeId));
                  if (!shoe) return null;

                  return (
                    <div key={shoeId} className="cart-item">
                      <div className="item-image">
                        <img src={shoe.image} alt={shoe.name} />
                      </div>
                      
                      <div className="item-info">
                        <h3>{shoe.name}</h3>
                        <p className="item-price">${shoe.price}</p>
                      </div>
                      
                      <div className="item-quantity">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleDecreaseQuantity(shoeId)}
                          >
                            -
                          </button>
                          <span className="quantity-display">{quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleIncreaseQuantity(shoeId)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="item-total">
                        <p>${shoe.price * quantity}</p>
                      </div>
                      
                      <div className="item-actions">
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveItem(shoeId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
                
                <div className="cart-actions">
                  <button className="btn btn-secondary" onClick={onClose}>
                    Continue Shopping
                  </button>
                  <button className="btn btn-primary">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart; 