const Order = require('../models/Order');
const Product = require('../models/Product');
const crypto = require('crypto');
const razorpay = require('../config/razorpay');

// Place Order
exports.placeOrder = async (req, res) => {
    const { items, totalPrice } = req.body;
    try {
        const order = new Order({ user: req.user.id, items, totalPrice });
        await order.save();

        // Update stock
        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

        // Create Razorpay order
        const razorpayOrder = await razorpay.createOrder({
            amount: totalPrice * 100,
            currency: 'INR',
            receipt: order._id.toString()
        });

        res.json({ order, razorpayOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Simulate payment verification
    const mockSignature = crypto.createHmac('sha256', 'mock_secret').update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');

    if (mockSignature === razorpay_signature) {
        await Order.findOneAndUpdate({ receipt: razorpay_order_id }, { paymentStatus: 'Completed', status: 'Processing' });
        res.json({ message: 'Payment successful' });
    } else {
        res.status(400).json({ error: 'Payment verification failed' });
    }
};
