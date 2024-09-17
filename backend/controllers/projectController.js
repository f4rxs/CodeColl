const {
    createProject,
    findProjectById,
    findProjectsByUser,
    updateProject,
    deleteProject,
    searchProjects,
    getProjectOverview,
    archiveProject,
    restoreArchivedProject,
    duplicateProject,
    getArchivedProjects,
    getUserOwnedProjects
} = require('../services/projectService');

// Create a new project
const createProjectController = async (req, res) => {
    const { owner_id, project_name, description } = req.body;
    try {
        const newProject = await createProject({ owner_id, project_name, description });
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        res.status(500).json({ message: 'Error in creating project', error: error.message });
    }
};

// Find project by ID
const findProjectByIdController = async (req, res) => {
    const { id: projectId } = req.params;
    try {
        const project = await findProjectById(projectId);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error finding project', error: error.message });
    }
};

// Find projects owned by user
const findProjectsByUserController = async (req, res) => {
    const { userId } = req.params;
    try {
        const projects = await findProjectsByUser(userId);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error finding projects for user', error: error.message });
    }
};

// Update a project
const updateProjectController = async (req, res) => {
    const { id: projectId } = req.params;
    const updateData = req.body;
    try {
        const updatedProject = await updateProject(projectId, updateData);
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
};

// Delete a project
const deleteProjectController = async (req, res) => {
    const { id: projectId } = req.params;
    try {
        const result = await deleteProject(projectId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error: error.message });
    }
};

// Search projects by term
const searchProjectsController = async (req, res) => {
    const { term } = req.query;
    try {
        const projects = await searchProjects(term);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error searching projects', error: error.message });
    }
};

// Get project overview
const getProjectOverviewController = async (req, res) => {
    const { id: projectId } = req.params;
    try {
        const overview = await getProjectOverview(projectId);
        res.status(200).json(overview);
    } catch (error) {
        res.status(500).json({ message: 'Error getting project overview', error: error.message });
    }
};

// Archive a project
const archiveProjectController = async (req, res) => {
    const { id: projectId } = req.params;
    try {
        const result = await archiveProject(projectId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error archiving project', error: error.message });
    }
};

// Restore an archived project
const restoreArchivedProjectController = async (req, res) => {
    const { id: projectId } = req.params;
    try {
        const result = await restoreArchivedProject(projectId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error restoring archived project', error: error.message });
    }
};

// Duplicate a project
const duplicateProjectController = async (req, res) => {
    const { id: projectId } = req.params;
    try {
        const newProject = await duplicateProject(projectId);
        res.status(201).json({ message: 'Project duplicated successfully', project: newProject });
    } catch (error) {
        res.status(500).json({ message: 'Error duplicating project', error: error.message });
    }
};

// Get archived projects
const getArchivedProjectsController = async (req, res) => {
    try {
        const archivedProjects = await getArchivedProjects();
        res.status(200).json(archivedProjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching archived projects', error: error.message });
    }
};

// Get projects owned by user
const getUserOwnedProjectsController = async (req, res) => {
    const { userId } = req.params;
    try {
        const projects = await getUserOwnedProjects(userId);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects owned by user', error: error.message });
    }
};

module.exports = {
    createProjectController,
    findProjectByIdController,
    findProjectsByUserController,
    updateProjectController,
    deleteProjectController,
    searchProjectsController,
    getProjectOverviewController,
    archiveProjectController,
    restoreArchivedProjectController,
    duplicateProjectController,
    getArchivedProjectsController,
    getUserOwnedProjectsController,
};
