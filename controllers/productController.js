const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;
    try {
        const product = new Product({ name, description, price, category, stock, images });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Products with Filtering and Pagination
exports.getFilteredProducts = async (req, res) => {
    const { category, price, color, size, brand, page = 1, limit = 10 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (price) query.price = { $lte: price };
    if (color) query.color = color;
    if (size) query.size = size;
    if (brand) query.brand = brand;

    try {
        const products = await Product.find(query)
            .populate('category')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    const { name, description, price, category, stock, images } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, category, stock, images }, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
