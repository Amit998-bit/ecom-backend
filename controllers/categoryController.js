const Category = require('../models/Category');

// Create Category
exports.createCategory = async (req, res) => {
    const { name, parent } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-');
    try {
        const category = new Category({ name, slug, parent });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parent');
        res.json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
