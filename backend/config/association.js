
const User = require('../src/User/user');
const Project = require('../src/Project/project');
const Collaborator = require('../src/ProjectCollaborator/projectCollaborators');
const File = require('../src/File/file');

// Define associations
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'projectOwner' });
Project.hasMany(Collaborator, { foreignKey: 'project_id', as: 'projectAndCollab' });
Project.hasMany(File, { foreignKey: 'project_id', as: 'projectFiles' });

Collaborator.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Collaborator.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

File.belongsTo(User, { foreignKey: 'locked_by', as: 'lockedByUser' });
File.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

module.exports = { User, Project, Collaborator, File };