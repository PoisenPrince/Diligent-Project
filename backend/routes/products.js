const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct
} = require('../controllers/productsController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // TODO: Protect with authentication middleware

module.exports = router;
