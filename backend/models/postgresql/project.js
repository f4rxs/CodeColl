const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const File = require('../postgresql/file');  
const Collaborator = require('../postgresql/projectCollaborators');

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
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'projects'
});

Project.hasMany(File, { foreignKey: 'project_id', as: 'files' });
Project.hasMany(Collaborator, { foreignKey: 'project_id', as: 'project_collaborators' });

module.exports = Project;
