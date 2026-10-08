import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { ProductDetail } from '../components/ProductDetail';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = productsData.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setError(null);
      } else {
        setError(`Product with ID "${id}" was not found in our store catalog.`);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <Loader message="Loading product details..." />;

  if (error || !product) {
    return <ErrorState message={error} />;
  }

  return <ProductDetail product={product} />;
};
