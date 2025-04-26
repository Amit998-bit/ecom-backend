const Coupon = require('../models/Coupon');

// Create Coupon
exports.createCoupon = async (req, res) => {
    const { code, discount, expiry, minOrderValue } = req.body;
    try {
        const coupon = new Coupon({ code, discount, expiry, minOrderValue });
        await coupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Apply Coupon
exports.applyCoupon = async (req, res) => {
    const { code, totalPrice } = req.body;
    try {
        const coupon = await Coupon.findOne({ code, expiry: { $gt: Date.now() }, minOrderValue: { $lte: totalPrice } });
        if (coupon) {
            res.json({ discount: coupon.discount });
        } else {
            res.status(400).json({ error: 'Invalid or expired coupon' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
