const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const produceEvent = require('../kafka/producer');
const { getUserId } = require('../state/userContext');

router.get('/', async (req, res) => {
  const userId = getUserId();
  if (!userId) return res.status(401).json({ error: 'User not logged in' });

  const profile = await Profile.findOne({ userId });
  res.json(profile);
});

router.post('/', async (req, res) => {
  const userId = getUserId();
  if (!userId) return res.status(401).json({ error: 'User not logged in' });

  const updated = await Profile.findOneAndUpdate(
    { userId },
    req.body,
    { new: true, upsert: true }
  );

  await produceEvent('user.updated', updated);
  res.json(updated);
});

module.exports = router;
