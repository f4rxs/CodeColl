const express = require('express');
const router = express.Router();
const activityLogController = require('../src/ActivityLog/activityLogController');
const auth = require('../middleware/auth');

//GET ROUTES
router.get('/project/:projectId',auth ,activityLogController.findActivitiesByProjectController); // tested
router.get('/user/:userId/activities', auth,activityLogController.findActivitiesByUserController); //tested
router.get('/overview/:projectId',auth ,activityLogController.getActivityOverviewController);

//POST ROUTES
router.post('/', auth,activityLogController.logActivityController); //tested
router.post('/file/edit/activity',auth ,activityLogController.trackFileEditActivityController); 
router.post('/comment/activity',auth ,activityLogController.trackCommentActivityController);



module.exports = router;
