const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const produceEvent = require('../kafka/producer');
const { getUserId } = require('../state/userContext');

// GET /user/address
router.get('/', async (req, res) => {
  try {
    const userId = getUserId();
    if (!userId) {
      return res.status(401).json({ error: true, message: 'User not logged in' });
    }

    const addresses = await Address.findAll({ where: { userId } });

    return res.status(200).json({ error: false, addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error.message);
    return res.status(500).json({ error: true, message: 'Internal server error' });
  }
});

// POST /user/address
router.post('/', async (req, res) => {
  try {
    const userId = getUserId();
    if (!userId) {
      return res.status(401).json({ error: true, message: 'User not logged in' });
    }

    const address = await Address.create({
      ...req.body,
      userId,
    });

    await produceEvent('user.address.added', address);

    return res.status(201).json({
      error: false,
      message: 'Address added successfully',
      address,
    });
  } catch (error) {
    console.error('Error adding address:', error.message);
    return res.status(500).json({ error: true, message: 'Failed to add address' });
  }
});

module.exports = router;
