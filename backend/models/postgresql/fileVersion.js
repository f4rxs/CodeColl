const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');

const FileVersion = sequelize.define('FileVersion', {
  file_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Files',
      key: 'id'
    }
  },
  version_number: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false
  },
  context: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'file_versions',
  createdAt : 'created_at',
 
});

module.exports = FileVersion;