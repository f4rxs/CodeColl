const projectService = require('./projectService');

const projectController = {
    createProjectController: async (req, res) => {
        const { owner_id, project_name, description } = req.body;
        try {
            const newProject = await projectService.createProject({ owner_id, project_name, description });
            res.status(201).json({ message: 'Project created successfully', project: newProject });
        } catch (error) {
            res.status(500).json({ message: 'Error in creating project', error: error.message });
        }
    },

    findProjectByIdController: async (req, res) => {
        const { id: projectId } = req.params;
        try {
            const project = await projectService.findProjectById(projectId);
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ message: 'Error finding project', error: error.message });
        }
    },

    findProjectsByUserController: async (req, res) => {
        const { userId } = req.params;
        try {
            const projects = await projectService.findProjectsByUser(userId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Error finding projects for user', error: error.message });
        }
    },

    updateProjectController: async (req, res) => {
        const { id: projectId } = req.params;
        const updateData = req.body;
        try {
            const updatedProject = await projectService.updateProject(projectId, updateData);
            res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
        } catch (error) {
            res.status(500).json({ message: 'Error updating project', error: error.message });
        }
    },

    deleteProjectController: async (req, res) => {
        const { id: projectId } = req.params;
        try {
            const result = await projectService.deleteProject(projectId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting project', error: error.message });
        }
    },
    searchProjectsController: async (req, res) => {
        const { term } = req.params;
        try {
            const projects = await projectService.searchProjects(term);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Error searching projects', error: error.message });
        }
    },

    getProjectOverviewController: async (req, res) => {
        const { id: projectId } = req.params;
        try {
            const overview = await projectService.getProjectOverview(projectId);
            res.status(200).json(overview);
        } catch (error) {
            res.status(500).json({ message: 'Error getting project overview', error: error.message });
        }
    },

    archiveProjectController: async (req, res) => {
        const { id: projectId } = req.params;
        try {
            const result = await projectService.archiveProject(projectId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error archiving project', error: error.message });
        }
    },

    restoreArchivedProjectController: async (req, res) => {
        const { id: projectId } = req.params;
        try {
            const result = await projectService.restoreArchivedProject(projectId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error restoring archived project', error: error.message });
        }
    },

    duplicateProjectController: async (req, res) => {
        const { id: projectId } = req.params;
        try {
            const newProject = await projectService.duplicateProject(projectId);
            res.status(201).json({ message: 'Project duplicated successfully', project: newProject });
        } catch (error) {
            res.status(500).json({ message: 'Error duplicating project', error: error.message });
        }
    },

    getArchivedProjectsController: async (req, res) => {
        try {
            const archivedProjects = await projectService.getArchivedProjects();
            res.status(200).json(archivedProjects);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching archived projects', error: error.message });
        }
    },

  

}




module.exports = projectController;
