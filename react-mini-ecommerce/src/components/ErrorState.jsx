import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="state-container">
      <div className="state-icon" style={{ color: 'var(--danger)' }}>
        <AlertTriangle size={48} />
      </div>
      <h3 className="state-title">Something Went Wrong</h3>
      <p className="state-desc">{message || 'Failed to load product details. Please try again.'}</p>
      {onRetry && (
        <button className="btn-primary" onClick={onRetry}>
          <RefreshCw size={16} />
          <span>Retry Loading</span>
        </button>
      )}
    </div>
  );
};
