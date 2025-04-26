// routes/orderRoutes.js

const express = require('express');
const { placeOrder, verifyPayment } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

console.log('placeOrder:', placeOrder);
console.log('verifyPayment:', verifyPayment);

router.post('/orders', protect, placeOrder);
router.post('/orders/verify', protect, verifyPayment);

module.exports = router;
