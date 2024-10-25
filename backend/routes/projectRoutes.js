const express = require('express');
const projectController = require('../src/Project/projectController');

const router = express.Router();

//8 routes to get fixed

//GET ROUTES
router.get('/:id', projectController.findProjectByIdController); //tested*
router.get('/search/:term', projectController.searchProjectsController);//tested*
router.get('/user/:userId', projectController.findProjectsByUserController);  //tested*
router.get('/overview/:id', projectController.getProjectOverviewController); //tested*
router.get('/project/archived/', projectController.getArchivedProjectsController); //tested*

//POST ROUTES 
router.post('/duplicate/:id', projectController.duplicateProjectController); //tested*
router.post('/', projectController.createProjectController); // tested*

//PUT ROUTES 
router.put('/:id', projectController.updateProjectController); //tested*
router.put('/archive/:id', projectController.archiveProjectController);  //tested*
router.put('/restore/:id', projectController.restoreArchivedProjectController); //tested*

//DELETE ROUTES 
router.delete('/:id', projectController.deleteProjectController); //tested*


module.exports = router;