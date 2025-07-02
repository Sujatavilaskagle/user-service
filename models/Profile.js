const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, default: uuid, unique: true },
  name: String,
  mobile: String,
  dob: String,
  gender: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', ProfileSchema);
