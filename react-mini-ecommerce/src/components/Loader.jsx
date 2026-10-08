import React from 'react';

export const Loader = ({ message = 'Loading products...' }) => {
  return (
    <div className="state-container">
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{message}</p>
    </div>
  );
};
