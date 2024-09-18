const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database/database');
const User = require('../postgresql/user');
const Project = require('../postgresql/project');

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
  tableName: 'invitations'
});

Invitation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Invitation.belongsTo(Project, { foreignKey: 'id', as: 'project' });


module.exports = Invitation;