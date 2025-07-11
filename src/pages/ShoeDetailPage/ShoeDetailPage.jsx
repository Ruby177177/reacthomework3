import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { shoesData } from '../../components/arrayShoe';
import './ShoeDetailPage.css';

function ShoeDetailPage({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    const foundShoe = shoesData.find(s => s.id === parseInt(id));
    if (foundShoe) {
      setShoe(foundShoe);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

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
    alert(`Added ${quantity} ${shoe.name} to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleBackToList = () => {
    navigate('/');
  };

  if (!shoe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shoe-detail-page">
      <Header cartCount={0} onCartClick={() => navigate('/cart')} />
      
      <main className="detail-page-content">
        <div className="detail-container">
          <button className="back-button" onClick={handleBackToList}>
            ← Back to Products
          </button>
          
          <div className="detail-content">
            <div className="detail-image-section">
              <img src={shoe.image} alt={shoe.name} className="detail-image" />
            </div>
            
            <div className="detail-info-section">
              <h1>{shoe.name}</h1>
              <p className="detail-price">${shoe.price}</p>
              <p className="detail-description">{shoe.description}</p>
              
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-controls">
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
              
              <div className="total-section">
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
      </main>
      
      <Footer />
    </div>
  );
}

export default ShoeDetailPage; 