const express = require('express');
const { addToCart, getCart, updateCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/cart', protect, addToCart);
router.get('/cart', protect, getCart);
router.put('/cart', protect, updateCart);
router.delete('/cart/:productId', protect, removeFromCart);

module.exports = router;
