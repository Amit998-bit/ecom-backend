const express = require('express');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { createCategory } = require('../controllers/categoryController');
const { createCoupon } = require('../controllers/couponController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/admin/products', protect, admin, createProduct);
router.put('/admin/products/:id', protect, admin, updateProduct);
router.delete('/admin/products/:id', protect, admin, deleteProduct);
router.post('/admin/categories', protect, admin, createCategory);
router.post('/admin/coupons', protect, admin, createCoupon);

module.exports = router;
