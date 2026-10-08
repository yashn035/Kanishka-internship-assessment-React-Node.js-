import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <ShoppingBag size={22} />
          </div>
          <span>AuraMart</span>
        </Link>

        <nav>
          {location.pathname !== '/cart' ? (
            <Link to="/cart" className="nav-link">
              <ShoppingCart size={18} />
              <span>Cart</span>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          ) : (
            <Link to="/" className="nav-link">
              <Store size={18} />
              <span>Explore Products</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
