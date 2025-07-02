const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, default: uuid },
  userId: String,
  status: String,
  totalAmount: Number,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
