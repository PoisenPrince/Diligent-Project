const Cart = require('../models/Cart');
const Product = require('../models/Product');

async function getCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

async function upsertCart(req, res, next) {
  try {
    const { sessionId, items = [] } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required' });
    }

    // Build cart items with pricing info from the database
    const itemDocs = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Invalid productId: ${item.productId}` });
      }
      const quantity = Math.max(Number(item.quantity) || 1, 1);
      const subtotal = product.price * quantity;
      itemDocs.push({ product: product._id, quantity, subtotal });
    }

    const total = itemDocs.reduce((acc, curr) => acc + curr.subtotal, 0);

    const cart = await Cart.findOneAndUpdate(
      { sessionId },
      { sessionId, items: itemDocs, total },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate('items.product');

    res.json(cart);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCart,
  upsertCart
};
