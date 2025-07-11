import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { shoesData } from '../../components/arrayShoe';
import './CartPage.css';

function CartPage({ cart, onUpdateQuantity, onRemoveItem }) {
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = Object.entries(cart).reduce((total, [shoeId, quantity]) => {
    const shoe = shoesData.find(s => s.id === parseInt(shoeId));
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

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="cart-page">
      <Header cartCount={totalItems} onCartClick={() => navigate('/cart')} />
      
      <main className="cart-page-content">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Shopping Cart ({totalItems} items)</h1>
            <button className="back-button" onClick={handleContinueShopping}>
              ← Continue Shopping
            </button>
          </div>

          <div className="cart-content">
            {totalItems === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <button className="btn btn-primary" onClick={handleContinueShopping}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {Object.entries(cart).map(([shoeId, quantity]) => {
                    const shoe = shoesData.find(s => s.id === parseInt(shoeId));
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
                    <button className="btn btn-secondary" onClick={handleContinueShopping}>
                      Continue Shopping
                    </button>
                    <button className="btn btn-primary" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default CartPage; 