import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer, CART_ACTIONS } from './cartReducer';

const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'aura_mart_cart_v1';

// Initial state hydrated from localStorage
const getInitialState = () => {
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? { items: JSON.parse(localData) } : { items: [] };
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return { items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // Sync state.items changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.items]);

  // Action helpers
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Derived computations
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for clean context consumption
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
