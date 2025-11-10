import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useDispatchCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatchCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchProduct() {
      try {
        const { data } = await api.get(`/products/${id}`);
        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        setError('Unable to load product.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    dispatch({
      type: 'ADD',
      payload: { ...product, quantity: 1 }
    });
  };

  if (loading) {
    return <p className="status">Loading product…</p>;
  }

  if (error || !product) {
    return <p className="status status--error">{error || 'Product not found.'}</p>;
  }

  const image = product.images?.[0] || 'https://via.placeholder.com/600x400.png?text=Product+Image';

  return (
    <section className="product-detail">
      <img src={image} alt={product.title} className="product-detail__image" />
      <div className="product-detail__body">
        <h1>{product.title}</h1>
        <p className="product-detail__price">
          {product.currency === 'USD' ? '$' : '₹'}{product.price}
        </p>
        <p>{product.description}</p>
        <p className="product-detail__tags">Tags: {product.tags?.join(', ') || 'None'}</p>
        <button className="button button--primary" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetail;
