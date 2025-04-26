// config/mockRazorpay.js

class MockRazorpay {
    async createOrder(options) {
        // Simulate the creation of a Razorpay order
        return {
            id: 'mock_order_id',
            amount: options.amount,
            currency: options.currency,
            receipt: options.receipt
        };
    }
}

module.exports = new MockRazorpay();
