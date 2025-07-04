const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { getUserId } = require('../state/userContext');

// GET /user/orders
router.get('/', async (req, res) => {
  try {
    const userId = getUserId();
    if (!userId) {
      return res.status(401).json({ error: true, message: 'User not logged in' });
    }

    const orders = await Order.findAll({ where: { userId } });

    return res.status(200).json({
      error: false,
      message: 'Orders fetched successfully',
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    return res.status(500).json({
      error: true,
      message: 'Failed to fetch orders',
    });
  }
});

module.exports = router;
