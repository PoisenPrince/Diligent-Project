const Product = require('../models/Product');

// Helper to build query filters based on request parameters
function buildProductFilters(query) {
  const filters = {};

  if (query.q) {
    const regex = new RegExp(query.q, 'i');
    filters.$or = [{ title: regex }, { description: regex }, { tags: regex }];
  }

  if (query.tag) {
    filters.tags = query.tag;
  }

  if (query.min || query.max) {
    filters.price = {};
    if (query.min) filters.price.$gte = Number(query.min);
    if (query.max) filters.price.$lte = Number(query.max);
  }

  return filters;
}

async function getProducts(req, res, next) {
  try {
    const { limit = 12, page = 1 } = req.query;
    const filters = buildProductFilters(req.query);
    const numericLimit = Math.min(Number(limit) || 12, 50);
    const numericPage = Math.max(Number(page) || 1, 1);
    const skip = (numericPage - 1) * numericLimit;

    const [items, total] = await Promise.all([
      Product.find(filters).skip(skip).limit(numericLimit).sort({ createdAt: -1 }),
      Product.countDocuments(filters)
    ]);

    res.json({
      data: items,
      pagination: {
        total,
        page: numericPage,
        limit: numericLimit,
        pages: Math.ceil(total / numericLimit) || 1
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct
};
