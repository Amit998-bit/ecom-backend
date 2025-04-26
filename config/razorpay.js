const Razorpay = require('razorpay');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Use the mock Razorpay module for testing
const useMock = process.env.USE_MOCK_RAZORPAY === 'true';

const razorpay = useMock
    ? require('./mockRazorpay')
    : new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET
      });

module.exports = razorpay;
