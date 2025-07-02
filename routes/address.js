const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const produceEvent = require('../kafka/producer');

const DUMMY_USER_ID = process.env.DUMMY_USER_ID;

router.get('/', async (req, res) => {
  const addresses = await Address.find({ userId: DUMMY_USER_ID });
  res.json(addresses);
});

router.post('/', async (req, res) => {
  const address = new Address({
    ...req.body,
    userId: DUMMY_USER_ID,
  });
  await address.save();
  await produceEvent('user.address.added', address);
  res.json(address);
});

module.exports = router;
