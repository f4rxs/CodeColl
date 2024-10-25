const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const User = require('../User/user');
const Project = require('../Project/project');

const Invitation = sequelize.define('Invitation', {
  inviter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  invitee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projects',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  tableName: 'invitations',
  createdAt : 'created_at',
  updatedAt : false
});

Invitation.belongsTo(User, { foreignKey: 'inviter_id', as: 'inviterUser' });
Invitation.belongsTo(User, { foreignKey: 'invitee_id', as: 'inviteeUser' });
Invitation.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

module.exports = Invitation;