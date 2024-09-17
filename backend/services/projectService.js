const { Op } = require('sequelize');
const Project = require('../models/postgresql/project');


const createProject = async (projectData) => {
    try {
        const { owner_id, project_name, description } = projectData;

        const newProject = await Project.create(projectData);

        return newProject;
    } catch (error) {
        throw new Error(`Error in creating a project: ${error.message}`);
    }
};

const findProjectById = async (projectId) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`No project found with the id ${projectId}`);
        }
        return project;
    } catch (error) {
        throw new Error(`Error finding project by id ${projectId}: ${error.message}`);
    }
};


const findProjectsByUser = async (userId) => {
    try {
        const projects = await Project.findAll({ where: { owner_id: userId } });
        if (projects.length === 0) {
            throw new Error(`No projects found for user with ID ${userId}`);
        }
        return projects;
    } catch (error) {
        throw new Error(`Error finding projects for user ${userId}: ${error.message}`);
    }
};

const updateProject = async (projectId, updateData) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found`);
        }
        await project.update(updateData);
        return project;
    } catch (error) {
        throw new Error(`Error updating project with ID ${projectId}: ${error.message}`);
    }
};

const deleteProject = async (projectId) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found`);
        }
        await project.destroy();
        return { message: `Project with ID ${projectId} deleted successfully` };
    } catch (error) {
        throw new Error(`Error deleting project with ID ${projectId}: ${error.message}`);
    }
};

const searchProjects = async (term) => {
    try {
        const projects = await Project.findAll({
            where: {
                [Op.or]: [
                    { project_name: { [Op.iLike]: `%${term}%` } },
                    { description: { [Op.iLike]: `%${term}%` } }
                ]
            }
        });
        return projects;
    } catch (error) {
        throw new Error(`Error searching projects: ${error.message}`);
    }
};

const getProjectOverview = async (projectId) => {
    try {
        
        const project = await Project.findByPk(projectId, {
            include: ['project_collaborators', 'files']  
        });
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found`);
        }

        const overview = {
            project_name: project.project_name,
            description: project.description,
            numberOfCollaborators: project.collaborators.length,
            numberOfFiles: project.files.length
        };

        return overview;
    } catch (error) {
        throw new Error(`Error getting project overview for project ${projectId}: ${error.message}`);
    }
};
``
const archiveProject = async (projectId) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found`);
        }
        await project.update({ archived: true });
        return { message: `Project with ID ${projectId} archived successfully` };
    } catch (error) {
        throw new Error(`Error archiving project with ID ${projectId}: ${error.message}`);
    }
};

const restoreArchivedProject = async (projectId) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found`);
        }
        await project.update({ archived: false });
        return { message: `Project with ID ${projectId} restored successfully` };
    } catch (error) {
        throw new Error(`Error restoring project with ID ${projectId}: ${error.message}`);
    }
};

const duplicateProject = async (projectId) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found`);
        }
        const newProject = await Project.create({
            owner_id: project.owner_id,
            project_name: `${project.project_name} - Copy`,
            description: project.description,
            status: project.status,
            archived: project.archived,
        });
        return newProject;
    } catch (error) {
        throw new Error(`Error duplicating project: ${error.message}`);
    }
};


const getArchivedProjects = async () => {
    try {
        const archivedProjects = await Project.findAll({ where: { archived: true } });
        return archivedProjects;
    } catch (error) {
        throw new Error(`Error fetching archived projects: ${error.message}`);
    }
};

const getUserOwnedProjects = async (userId) => {
    try {
        const userProjects = await Project.findAll({ where: { owner_id: userId } });
        return userProjects;
    } catch (error) {
        throw new Error(`Error fetching projects owned by user ${userId}: ${error.message}`);
    }
};

module.exports = {
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

}