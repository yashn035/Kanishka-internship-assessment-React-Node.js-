import React, { useState, useEffect, useMemo } from 'react';
import productsData from '../data/products.json';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Simulate network fetch to demonstrate loading state & error handling capability
  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError('Unable to parse product catalog.');
        setLoading(false);
      }
    }, 400); // realistic light network latency
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Compute categories dynamically
  const categories = useMemo(() => {
    const set = new Set(productsData.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Combined Search + Category Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Discover Cutting-Edge Products
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Explore our premium catalog with high performance and instant cart management.
        </p>
      </div>

      <div className="controls-section">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {loading && <Loader message="Fetching curated products..." />}

      {error && <ErrorState message={error} onRetry={fetchProducts} />}

      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState
          type="search"
          message={`No products matched "${searchTerm}" in ${selectedCategory} category.`}
        />
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};
