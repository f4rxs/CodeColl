const Collaborator = require('./projectCollaborators');
const User = require('../User/user');
const Project = require('../Project/project');
const projectCollaboratorsService = {
    addCollaborator: async (projectId, userId, role, permissions) => {
        try {
            const existingCollaborator = await Collaborator.findOne({
                where: { project_id: projectId, user_id: userId }
            });

            if (existingCollaborator) {
                throw new Error(`User with ID ${userId} is already a collaborator on project ${projectId}`);
            }

            const newCollaborator = await Collaborator.create({
                project_id: projectId,
                user_id: userId,
                role,
                permissions
            });

            return newCollaborator;
        } catch (error) {
            throw new Error(`Error adding collaborator to project ${projectId}: ${error.message}`);
        }
    },

    findProjectsOfTheUser: async (userId) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} is not found`);
            }

            const projects = await Collaborator.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Project,
                        as: 'project',
                        attributes: ['id', 'project_name', 'description', 'owner_id'], 
                    }
                ]
            });

            const userProjects = projects.map(collaboration => collaboration.project);

            return userProjects;
        } catch (error) {
            throw new Error(`Error finding projects for user ${userId}: ${error.message}`);
        }
    },

    findCollaboratorsByProject: async (projectId) => {
        try {
            const collaborators = await Collaborator.findAll({
                where: { project_id: projectId },
                include: ['user']
            });

            if (collaborators.length === 0) {
                throw new Error(`No collaborators found for project ID ${projectId}`);
            }

            return collaborators;
        } catch (error) {
            throw new Error(`Error finding collaborators for project ${projectId}: ${error.message}`);
        }
    },



    updateCollaboratorRole: async (projectId, userId, newRole) => {
        try {
            const collaborator = await Collaborator.findOne({
                where: { project_id: projectId, user_id: userId }
            });

            if (!collaborator) {
                throw new Error(`Collaborator with ID ${userId} not found on project ${projectId}`);
            }

            await collaborator.update({ role: newRole });
            return collaborator;
        } catch (error) {
            throw new Error(`Error updating role for collaborator ${userId} on project ${projectId}: ${error.message}`);
        }
    },


    removeCollaborator: async (projectId, userId) => {
        try {
            const collaborator = await Collaborator.findOne({
                where: { project_id: projectId, user_id: userId }
            });

            if (!collaborator) {
                throw new Error(`Collaborator with ID ${userId} not found on project ${projectId}`);
            }

            await collaborator.destroy();
            return { message: `Collaborator with ID ${userId} removed from project ${projectId}` };
        } catch (error) {
            throw new Error(`Error removing collaborator from project ${projectId}: ${error.message}`);
        }
    },

    getCollaboratorUsernames: async (projectId) => {
        try {
            const collaborators = await Collaborator.findAll({
                where: { project_id: projectId },
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['username']
                }]
            });

            const usernames = collaborators.map(collaborator => collaborator.user.username);

            return usernames;
        } catch (error) {
            throw new Error(`Error getting collaborator usernames for project ${projectId}: ${error.message}`);
        }
    }

}



module.exports = projectCollaboratorsService;


