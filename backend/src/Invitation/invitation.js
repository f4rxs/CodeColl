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
  },
  message:{
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
  tableName: 'invitations',
  createdAt : 'created_at',
  updatedAt : false
});



module.exports = Invitation;