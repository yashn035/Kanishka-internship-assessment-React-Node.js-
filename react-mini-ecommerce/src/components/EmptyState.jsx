import React from 'react';
import { SearchX, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({ type = 'search', message, actionText, actionLink }) => {
  return (
    <div className="state-container">
      <div className="state-icon">
        {type === 'cart' ? <ShoppingBag size={48} /> : <SearchX size={48} />}
      </div>
      <h3 className="state-title">
        {type === 'cart' ? 'Your Cart is Empty' : 'No Products Found'}
      </h3>
      <p className="state-desc">
        {message ||
          (type === 'cart'
            ? "Looks like you haven't added any products to your shopping cart yet."
            : 'We couldn’t find any products matching your current search or category criteria.')}
      </p>

      {actionLink && (
        <Link to={actionLink} className="btn-primary">
          {actionText || 'Browse Catalog'}
        </Link>
      )}
    </div>
  );
};
