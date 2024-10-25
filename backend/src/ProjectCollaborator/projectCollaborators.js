const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const User = require('../User/user');
const Project = require('../Project/project');

const Collaborator = sequelize.define('Collaborator', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey : true,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey : true,
    allowNull: false,
    references: {
      model: 'projects', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions : {
    type : DataTypes.JSONB,
    allowNull : false
  }
}, {
  timestamps: true,
  createdAt : 'added_at',
  updatedAt : false,
  tableName: 'project_collaborators',
});

// Define associations
// Collaborator.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// Collaborator.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });


module.exports = Collaborator;
