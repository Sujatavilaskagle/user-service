const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const produceEvent = require('../kafka/producer');

const DUMMY_USER_ID = process.env.DUMMY_USER_ID;

router.get('/', async (req, res) => {
  const profile = await Profile.findOne({ userId: DUMMY_USER_ID });
  res.json(profile);
});

router.put('/', async (req, res) => {
  const updated = await Profile.findOneAndUpdate(
    { userId: DUMMY_USER_ID },
    req.body,
    { new: true, upsert: true }
  );
  await produceEvent('user.updated', updated);
  res.json(updated);
});

module.exports = router;
