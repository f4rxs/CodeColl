const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');

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
  }
}, {
  timestamps: true,
  tableName: 'files'
});

module.exports = File;