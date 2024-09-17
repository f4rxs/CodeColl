const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const Project = require('../postgresql/project');
const File = sequelize.define('File', {
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projects',
      key: 'id'
    }
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  locked_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  lock_timestamp: {
    type: DataTypes.DATE,
  }
}, {
  timestamps: true,
  createdAt : false,
  updatedAt : 'updated_at',
  tableName: 'files'
});
module.exports = File;