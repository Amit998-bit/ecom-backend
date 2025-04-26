const express = require('express');
const { viewProfile, editProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', protect, viewProfile);
router.put('/profile', protect, editProfile);

module.exports = router;
