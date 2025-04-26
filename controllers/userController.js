const User = require('../models/User');

// View Profile
exports.viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit Profile
exports.editProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
