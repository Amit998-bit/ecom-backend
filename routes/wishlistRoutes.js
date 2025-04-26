const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/wishlist', protect, addToWishlist);
router.get('/wishlist', protect, getWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);

module.exports = router;
