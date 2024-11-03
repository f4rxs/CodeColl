const { Op } = require('sequelize');
const Project = require('../Project/project');
const Collaborator = require('../ProjectCollaborator/projectCollaborators');
const User = require('../User/user');
const projectService = {
     createProject : async (projectData) => {
        try {
            const { owner_id, project_name, description } = projectData;
    
            // Check if owner exists
            const ownerExists = await User.findByPk(owner_id);
            if (!ownerExists) {
                throw new Error(`User with the id ${owner_id} does not exist`);
            }
    
            const newProject = await Project.create(projectData);
            await Collaborator.create({
                user_id: owner_id,
                project_id: newProject.id,
                role: 'Owner',
                permissions: { can_edit: true, can_lock_files: true, can_manage_collaborators: true }
            });
    
            return newProject;
        } catch (error) {
            throw new Error(`Error in creating a project: ${error.message}`);
        }
    },

    findProjectById: async (projectId) => {
        try {
            const project = await Project.findByPk(projectId);
            if (!project) {
                throw new Error(`No project found with the id ${projectId}`);
            }
            return project;
        } catch (error) {
            throw new Error(`Error finding project by id ${projectId}: ${error.message}`);
        }
    },

    findProjectsByUser: async (userId) => {
        try {
            const projects = await Project.findAll({ where: { owner_id: userId } });
            if (projects.length === 0) {
                throw new Error(`No projects found for user with ID ${userId}`);
            }
            return projects;
        } catch (error) {
            throw new Error(`Error finding projects for user ${userId}: ${error.message}`);
        }
    },

    updateProject: async (projectId, updateData) => {
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
    },

    deleteProject: async (projectId) => {
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
    },

    searchProjects: async (term) => {
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
    },

    getProjectOverview: async (projectId) => {
        try {
            const project = await Project.findByPk(projectId, {
                include: [
                    'projectAndCollab', 'projectFiles', 'projectOwner'
                ]
            });

            if (!project) {
                throw new Error(`Project with ID ${projectId} not found`);
            }

            const overview = {
                project_name: project.project_name,
                description: project.description,
                numberOfCollaborators: project.projectAndCollab ? project.projectAndCollab.length : 0,
                numberOfFiles: project.projectFiles ? project.projectFiles.length : 0
            };

            return overview;
        } catch (error) {
            throw new Error(`Error getting project overview for project ${projectId}: ${error.message}`);
        }
    },
    archiveProject: async (projectId) => {
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
    },

    restoreArchivedProject: async (projectId) => {
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
    },

    duplicateProject: async (projectId) => {
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
    },


    getArchivedProjects: async () => {
        try {
            const archivedProjects = await Project.findAll({ where: { archived: true } });
            if (archivedProjects.length === 0) {
                throw new Error('No archived projects found');
            }
            return archivedProjects;
        } catch (error) {
            throw new Error(`Error fetching archived projects: ${error.message}`);
        }
    },



}


module.exports = projectService;