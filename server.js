const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors'); // Import the cors package

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.options('*', cors()); // Handle preflight OPTIONS requests

// Enable CORS
app.use(cors()); // Allow all origins (for development)

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', orderRoutes);
app.use('/api', couponRoutes);
app.use('/api', adminRoutes);
app.use('/api', cartRoutes);
app.use('/api', wishlistRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
