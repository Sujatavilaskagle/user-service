require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const startConsumer = require('./kafka/consumer');

const app = express();
app.use(express.json());

connectDB();
startConsumer(); // <-- Start consuming "user.loggedin"

const profileRoutes = require('./routes/profile');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');

app.use('/user/profile', profileRoutes);
app.use('/user/address', addressRoutes);
app.use('/user/orders', orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
