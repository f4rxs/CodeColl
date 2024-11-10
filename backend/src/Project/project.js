const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const User = require('../User/user');
const Collaborator = require('../ProjectCollaborator/projectCollaborators');
const File = require('../File/file');

const Project = sequelize.define('Project', {
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  archived: {
    type : DataTypes.BOOLEAN,
    allowNull : true,
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'projects',
});

// Project.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });


// Project.belongsTo(User, { foreignKey: 'owner_id', as: 'projectOwner' });
// Project.hasMany(Collaborator, { foreignKey: 'project_id', as: 'projectAndCollab' });
// Project.hasMany(File, { foreignKey: 'project_id', as: 'projectFiles' });

module.exports = Project;
