import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const image = product.images?.[0] ||
    'https://via.placeholder.com/400x300.png?text=Product+Image';

  return (
    <article className="product-card">
      <img src={image} alt={product.title} className="product-card__image" />
      <div className="product-card__body">
        <h3>{product.title}</h3>
        <p className="product-card__price">
          {product.currency === 'USD' ? '$' : '₹'}{product.price}
        </p>
        <p className="product-card__tags">{product.tags?.join(', ')}</p>
        <Link to={`/product/${product._id}`} className="button button--primary">
          View Details
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
