const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Place an order
router.post('/', protect, async (req, res) => {
    try {
        const { products, total } = req.body;
        const order = new Order({ user: req.user._id, products, total });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: 'Order creation failed' });
    }
});

// Get user’s orders
router.get('/my-orders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.json(orders);
});