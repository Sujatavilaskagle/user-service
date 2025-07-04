const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const produceEvent = require('../kafka/producer');
const { getUserId } = require('../state/userContext');

// GET /user/profile
router.get('/', async (req, res) => {
  try {
    const userId = getUserId();
    if (!userId) {
      return res.status(401).json({ error: true, message: 'User not logged in' });
    }

    const profile = await Profile.findByPk(userId);

    if (!profile) {
      return res.status(404).json({ error: true, message: 'Profile not found' });
    }

    return res.status(200).json({ error: false, profile });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    return res.status(500).json({ error: true, message: 'Internal server error' });
  }
});

// PUT /user/profile
router.put('/', async (req, res) => {
  try {
    const userId = getUserId();
    if (!userId) {
      return res.status(401).json({ error: true, message: 'User not logged in' });
    }

    const [profile] = await Profile.upsert(
      { userId, ...req.body },
      { returning: true }
    );

    await produceEvent('user.updated', profile);

    return res.status(200).json({
      error: false,
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return res.status(500).json({ error: true, message: 'Failed to update profile' });
  }
});

module.exports = router;
