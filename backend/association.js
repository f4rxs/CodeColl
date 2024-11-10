
const User = require('./src/User/user');
const Project = require('./src/Project/project');
const Collaborator = require('./src/ProjectCollaborator/projectCollaborators');
const File = require('./src/File/file');
const Invitation = require('./src/Invitation/invitation');


// Project associations
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'projectOwner' });
Project.hasMany(Collaborator, { foreignKey: 'project_id', as: 'projectAndCollab' });
Project.hasMany(File, { foreignKey: 'project_id', as: 'projectFiles' });

// File associations
File.belongsTo(User, { foreignKey: 'locked_by', as: 'lockedByUser' });
File.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// Collaborator associations
Collaborator.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Collaborator.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// Invitation associations
Invitation.belongsTo(User, { foreignKey: 'inviter_id', as: 'inviterUser' });
Invitation.belongsTo(User, { foreignKey: 'invitee_id', as: 'inviteeUser' });
Invitation.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

module.exports = {
    User,
    Project,
    Collaborator,
    File,
    Invitation,
};
