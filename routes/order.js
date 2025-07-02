const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const DUMMY_USER_ID = process.env.DUMMY_USER_ID;

router.get('/', async (req, res) => {
  const orders = await Order.find({ userId: DUMMY_USER_ID });
  res.json(orders);
});

module.exports = router;
