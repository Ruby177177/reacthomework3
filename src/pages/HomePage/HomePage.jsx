import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ShoeList from '../../components/ShoeList/ShoeList.jsx';
import { shoesData } from '../../components/arrayShoe';
import './HomePage.css';

function HomePage({ cart, onAddToCart }) {
  const navigate = useNavigate();

  // Calculate total items in cart
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const handleViewDetail = (shoeId) => {
    navigate(`/product/${shoeId}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="home-page">
      <Header cartCount={cartCount} onCartClick={handleCartClick} />
      
      <main className="home-content">
        <ShoeList 
          shoes={shoesData} 
          onAddToCart={onAddToCart}
          onViewDetail={handleViewDetail}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default HomePage; 