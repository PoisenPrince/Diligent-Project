import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        const { data } = await api.get('/products');
        if (isMounted) {
          setProducts(data.data);
        }
      } catch (err) {
        setError('Unable to load products.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="status">Loading products…</p>;
  }

  if (error) {
    return <p className="status status--error">{error}</p>;
  }

  return (
    <section>
      <h1>Featured Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Home;
