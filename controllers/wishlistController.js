const Wishlist = require('../models/Wishlist');

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user.id, products: [] });
        }
        wishlist.products.push(productId);
        await wishlist.save();
        res.json(wishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Wishlist
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
        res.json(wishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id });
        wishlist.products = wishlist.products.filter(product => product.toString() !== productId);
        await wishlist.save();
        res.json(wishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
