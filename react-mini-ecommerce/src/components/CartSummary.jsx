import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartSummary = () => {
  const { totalItems, totalPrice, clearCart } = useCart();
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + tax;

  const handleCheckout = () => {
    alert('Thank you for your order! Cart reset.');
    clearCart();
  };

  return (
    <div className="cart-summary">
      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-row">
        <span>Items count</span>
        <span>{totalItems}</span>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Estimated Tax (8%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>

      <button className="btn-primary btn-block" onClick={handleCheckout}>
        <span>Proceed to Checkout</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
