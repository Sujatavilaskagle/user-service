const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Profile = sequelize.define('Profile', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'profiles',
  timestamps: true,           // adds createdAt + updatedAt
  createdAt: 'created_at',    // rename to match your schema
  updatedAt: false,           // disable updatedAt if not needed
});

module.exports = Profile;
