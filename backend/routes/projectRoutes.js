const express = require('express');
const projectController = require('../src/Project/projectController');
const router = express.Router();
const validateRequest = require('../utils/validateRequest');
const {
    validateProjectId,
    validateUserId,
    validateSearchTerm,
    validateProjectCreation,
    validateProjectUpdate,
} = require('../src/Project/projectValidators');

const auth = require('../middleware/auth');
//GET ROUTES
router.get('/:id', validateRequest, projectController.findProjectByIdController); //tested*
router.get('/search/:term', validateSearchTerm, validateRequest, projectController.searchProjectsController);//tested*
router.get('/user/:userId', validateUserId, validateRequest, projectController.findProjectsByUserController);  //tested*
router.get('/overview/:id', validateProjectId, validateRequest, projectController.getProjectOverviewController); //tested*
router.get('/project/archived/', projectController.getArchivedProjectsController); //tested*

//POST ROUTES 
router.post('/duplicate/:id', validateProjectId, validateRequest, projectController.duplicateProjectController); //tested*
router.post('/', validateProjectCreation, validateRequest, projectController.createProjectController); // tested*

//PUT ROUTES 
router.put('/:id', validateProjectId, validateProjectUpdate, validateRequest, projectController.updateProjectController); //tested*
router.put('/archive/:id', validateProjectId, validateRequest, projectController.archiveProjectController);  //tested*
router.put('/restore/:id', validateProjectId, validateRequest, projectController.restoreArchivedProjectController); //tested*

//DELETE ROUTES 
router.delete('/:id', validateProjectId, validateRequest, projectController.deleteProjectController); //tested*


module.exports = router;