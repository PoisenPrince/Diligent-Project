import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/">Diligent Store</Link>
      </div>
      <nav className="navbar__nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({itemCount})</Link>
      </nav>
    </header>
  );
};

export default Navbar;
