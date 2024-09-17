const express = require('express');
const {
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
} = require('../controllers/projectController');

const router = express.Router();

// Create a new project
router.post('/project', createProjectController); // tested

// Find a project by ID
router.get('/project/:id', findProjectByIdController); //tested

// Find all projects owned by a user
router.get('/project/user/:userId', findProjectsByUserController);  //tested

// Update a project (added :id to the URL)
router.put('/project/:id', updateProjectController); //tested

// Delete a project
router.delete('/project/:id', deleteProjectController); //tested

// Search for projects by term
router.get('/project-search', searchProjectsController); //tested

// Get project overview
router.get('/project-overview/:id', getProjectOverviewController); // test should be after finishing the tables associated to it

// Archive a project
router.put('/project-archive/:id', archiveProjectController);  //tested (working as a route but acctually no column in the table 'projects' is called archeived)

// Restore an archived project
router.put('/project-restore/:id', restoreArchivedProjectController); // same for this

// Duplicate a project
router.post('/project-duplicate/:id', duplicateProjectController); //tested

// Get all archived projects
router.get('/project-archived', getArchivedProjectsController); // same as the mentioned issue related to archeive feature

// Get all projects owned by a user
router.get('/user-projects/:userId', getUserOwnedProjectsController); // need to implement the logic of role (if it owner or user)

module.exports = router;