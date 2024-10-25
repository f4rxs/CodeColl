const express = require('express');
const router = express.Router();
const activityLogController = require('../src/ActivityLog/activityLogController');

//GET ROUTES
router.get('/project/:projectId', activityLogController.findActivitiesByProjectController); // tested
router.get('/user/:userId/activites', activityLogController.findActivitiesByUserController); //tested
router.get('/overview/:projectId', activityLogController.getActivityOverviewController);

//POST ROUTES
router.post('/', activityLogController.logActivityController); //tested
router.post('/file/edit/activity', activityLogController.trackFileEditActivityController); 
router.post('/comment/activity', activityLogController.trackCommentActivityController);



module.exports = router;
