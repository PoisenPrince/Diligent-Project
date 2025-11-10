import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/api';
import { useCart, useDispatchCart } from '../context/CartContext';

const getSessionId = () => {
  const existing = localStorage.getItem('diligent_cart_id');
  if (existing) return existing;
  const generated = `session-${Date.now()}`;
  localStorage.setItem('diligent_cart_id', generated);
  return generated;
};

const CartPage = () => {
  const { items } = useCart();
  const dispatch = useDispatchCart();
  const [status, setStatus] = useState(null);
  const sessionId = useMemo(() => getSessionId(), []);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const syncCart = async (updatedItems) => {
    try {
      await api.post('/cart', {
        sessionId,
        items: updatedItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity
        }))
      });
      setStatus('Cart saved');
      setTimeout(() => setStatus(null), 1500);
    } catch (error) {
      setStatus('Unable to sync cart');
    }
  };

  const handleUpdate = (id, quantity) => {
    const safeQty = Math.max(Number(quantity) || 1, 1);
    dispatch({ type: 'UPDATE_QTY', payload: { _id: id, quantity: safeQty } });
    const updatedItems = items.map((item) =>
      item._id === id ? { ...item, quantity: safeQty } : item
    );
    syncCart(updatedItems);
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
    const updatedItems = items.filter((item) => item._id !== id);
    syncCart(updatedItems);
  };

  useEffect(() => {
    if (items.length === 0) {
      setStatus(null);
    }
  }, [items]);

  if (items.length === 0) {
    return <p className="status">Your cart is empty. Start exploring products!</p>;
  }

  return (
    <section className="cart">
      <h1>Your Cart</h1>
      {status && <p className="status status--info">{status}</p>}
      <ul className="cart__list">
        {items.map((item) => (
          <li key={item._id} className="cart__item">
            <div>
              <h2>{item.title}</h2>
              <p>
                {item.currency === 'USD' ? '$' : '₹'}{item.price} ×
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdate(item._id, e.target.value)}
                />
              </p>
            </div>
            <button className="button button--ghost" onClick={() => handleRemove(item._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart__summary">
        <p>Total: <strong>₹{total.toFixed(2)}</strong></p>
        <button className="button button--primary" disabled>
          Checkout (coming soon)
        </button>
      </div>
    </section>
  );
};

export default CartPage;
