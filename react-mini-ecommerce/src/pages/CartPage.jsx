import React from 'react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { EmptyState } from '../components/EmptyState';
import { Trash2 } from 'lucide-react';

export const CartPage = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <EmptyState
        type="cart"
        message="Your shopping cart is currently empty. Explore our catalog to add items!"
        actionText="Explore Catalog"
        actionLink="/"
      />
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Shopping Cart</h1>
        <button
          onClick={clearCart}
          style={{
            background: 'transparent',
            color: 'var(--danger)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem'
          }}
        >
          <Trash2 size={16} />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary />
      </div>
    </div>
  );
};
