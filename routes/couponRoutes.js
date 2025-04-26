const express = require('express');
const { createCoupon, applyCoupon } = require('../controllers/couponController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/coupons', protect, admin, createCoupon);
router.post('/coupons/apply', protect, applyCoupon);

module.exports = router;
