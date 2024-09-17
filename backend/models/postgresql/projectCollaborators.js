const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const Project = require('./project');
const User = require('./user');
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
  tableName: 'project_collaborators',
  createdAt : "added_at",
  updatedAt : false

});
Collaborator.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
module.exports = Collaborator;