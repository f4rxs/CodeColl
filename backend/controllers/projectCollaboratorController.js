const { addCollaborator,
    findCollaboratorsByProject,
    updateCollaboratorRole,
    removeCollaborator ,
getCollaboratorUsernames } = require("../services/projectCollaboratorsService");

const addCollaboratorController = async (req, res) => {
    const { projectId: project_id, userId: user_id, role } = req.body;
    try {
        const collaborator = await addCollaborator(project_id, user_id, role);
        res.status(200).json({ message: 'Collaborator added successfully', collaborator });
    } catch (error) {
        res.status(500).json({ message: 'Error adding collaborator', error: error.message });
    }
};


const findCollaboratorsByProjectController = async (req, res) => {
    const { projectId } = req.params;
    try {
        const collaborators = await findCollaboratorsByProject(projectId);
        res.status(200).json({ collaborators });
    } catch (error) {
        res.status(500).json({ message: 'Error finding collaborators', error: error.message });
    }
};

const updateCollaboratorRoleController = async (req, res) => {
    const { projectId: project_id, userId: user_id, newRole } = req.body;
    try {
        const updatedCollaborator = await updateCollaboratorRole(project_id, user_id, newRole);
        res.status(200).json({ message: 'Collaborator role updated successfully', updatedCollaborator });
    } catch (error) {
        res.status(500).json({ message: 'Error updating collaborator role', error: error.message });
    }
};

const removeCollaboratorController = async (req, res) => {
    const { projectId: project_id, userId: user_id } = req.body;
    try {
        const result = await removeCollaborator(project_id, user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error removing collaborator', error: error.message });
    }
};

const getCollaboratorUsernamesController = async (req, res) => {
    const { projectId } = req.params;  
    try {
        const usernames = await getCollaboratorUsernames(projectId);
        res.status(200).json({ usernames });
    } catch (error) {
        res.status(500).json({ message: 'Error getting collaborator usernames', error: error.message });
    }
};

module.exports = {
    addCollaboratorController,
    findCollaboratorsByProjectController,
    updateCollaboratorRoleController,
    removeCollaboratorController ,
    getCollaboratorUsernamesController
};