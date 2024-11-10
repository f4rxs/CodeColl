const projectCollaboratorsService = require("./projectCollaboratorsService");

const projectCollaboratorsController = {
    addCollaboratorController: async (req, res) => {
        const {projectId: project_id, userId: user_id} = req.params;
        const { role , permissions} = req.body;
        try {
            const collaborator = await projectCollaboratorsService.addCollaborator(project_id, user_id, role,permissions);
            res.status(200).json({ message: 'Collaborator added successfully', collaborator });
        } catch (error) {
            res.status(500).json({ message: 'Error adding collaborator', error: error.message });
        }
    },

    getUserProjectsController: async (req, res) => {
        const { userId } = req.params;
        try {
            const projects = await projectCollaboratorsService.findProjectsOfTheUser(userId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user projects', error: error.message });
        }
    },


    findCollaboratorsByProjectController: async (req, res) => {
        const { projectId } = req.params;
        try {
            const collaborators = await projectCollaboratorsService.findCollaboratorsByProject(projectId);
            res.status(200).json({ collaborators });
        } catch (error) {
            res.status(500).json({ message: 'Error finding collaborators', error: error.message });
        }
    },

    updateCollaboratorRoleController: async (req, res) => {
        const { projectId, userId } = req.params;
        const { newRole } = req.body;
        try {
            const updatedCollaborator = await projectCollaboratorsService.updateCollaboratorRole(projectId, userId, newRole);
            res.status(200).json({ message: 'Collaborator role updated successfully', updatedCollaborator });
        } catch (error) {
            res.status(500).json({ message: 'Error updating collaborator role', error: error.message });
        }
    },

    removeCollaboratorController: async (req, res) => {
        const { projectId, userId } = req.params;

        try {
            const result = await projectCollaboratorsService.removeCollaborator(projectId, userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error removing collaborator', error: error.message });
        }
    },

    getCollaboratorUsernamesController: async (req, res) => {
        const { projectId } = req.params;
        try {
            const usernames = await projectCollaboratorsService.getCollaboratorUsernames(projectId);
            res.status(200).json({ usernames });
        } catch (error) {
            res.status(500).json({ message: 'Error getting collaborator usernames', error: error.message });
        }
    }

}

module.exports = projectCollaboratorsController;