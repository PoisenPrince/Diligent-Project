const express = require('express');
const router = express.Router();
const { getCart, upsertCart } = require('../controllers/cartController');

router.get('/:id', getCart);
router.post('/', upsertCart);

module.exports = router;
