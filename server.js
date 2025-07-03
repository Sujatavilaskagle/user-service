require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const startConsumer = require('./kafka/consumer');

const app = express();
app.use(express.json());

// Connect PostgreSQL
connectDB();

// Sync models (you can use migrations in real projects)
sequelize.sync().then(() => console.log("📦 Models synced"));

startConsumer();

const profileRoutes = require('./routes/profile');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');

app.use('/user/profile', profileRoutes);
app.use('/user/address', addressRoutes);
app.use('/user/orders', orderRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
