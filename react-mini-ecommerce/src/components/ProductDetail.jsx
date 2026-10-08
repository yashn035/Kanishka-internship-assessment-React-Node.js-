import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetail = ({ product }) => {
  const { addToCart, cart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  return (
    <div>
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        <span>Back to products</span>
      </Link>

      <div className="product-detail-container">
        <div className="detail-img-wrapper">
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>

          <div className="product-rating">
            <Star size={18} fill="currentColor" />
            <span>{product.rating} / 5.0 Rating</span>
          </div>

          <div className="detail-price">${product.price.toFixed(2)}</div>

          <p className="detail-desc">{product.description}</p>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn-primary" onClick={() => addToCart(product)}>
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
            {inCartQty > 0 && (
              <span style={{ color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                <CheckCircle size={16} /> {inCartQty} in cart
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
