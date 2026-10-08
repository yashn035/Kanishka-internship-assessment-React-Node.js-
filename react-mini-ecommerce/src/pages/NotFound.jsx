import React from 'react';
import { EmptyState } from '../components/EmptyState';

export const NotFound = () => {
  return (
    <EmptyState
      type="search"
      message="404 - The page or resource you requested does not exist."
      actionText="Back to Home"
      actionLink="/"
    />
  );
};
