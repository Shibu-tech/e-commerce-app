const express = require('express');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://e-commerce-app-eight-sooty.vercel.app/"
    ],
    credentials: true
}));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);

module.exports = app;