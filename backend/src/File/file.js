const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const User = require('../User/user');
const Project = require('../Project/project');

const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  locked_by: {
    type: DataTypes.INTEGER,
    allowNull: true,  
    references: {
      model: 'users',  
      key: 'id',
    },
    onDelete: 'SET NULL', 
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',  
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
  createdAt : false,
  updatedAt : "updated_at",
  tableName: 'files',
});



module.exports = File;
