const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const AddressSchema = new mongoose.Schema({
  addressId: { type: String, default: uuid, unique: true },
  userId: String,
  address: String,
  pin: String,
  city: String,
  state: String,
  isDefault: Boolean
});

module.exports = mongoose.model('Address', AddressSchema);
