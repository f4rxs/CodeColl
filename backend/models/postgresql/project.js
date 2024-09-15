const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database'); 

const Project = sequelize.define('Project', {
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id'
    }
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,  
  tableName: 'projects'
});

module.exports = Project;