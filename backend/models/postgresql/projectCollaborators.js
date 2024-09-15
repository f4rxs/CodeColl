const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');

const Collaborator = sequelize.define('Collaborator', {
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
  role: {
    type: DataTypes.STRING,
    allowNull: false 
  }
}, {
  timestamps: true,
  tableName: 'project_collaborators'
});

module.exports = Collaborator;