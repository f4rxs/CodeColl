const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');

const ActivityLog = sequelize.define('ActivityLog', {
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projects',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false  
  }
}, {
  timestamps: true,
  tableName: 'activity_logs'
});

module.exports = ActivityLog;