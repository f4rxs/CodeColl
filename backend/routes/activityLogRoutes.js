const express = require('express');
const router = express.Router();
const {
    logActivityController,
    findActivitiesByProjectController,
    findActivitiesByUserController,
    trackFileEditActivityController,
    trackCommentActivityController,
    getActivityOverviewController
} = require('../controllers/activityLogController');

// Route to log a generic activity
router.post('/log', logActivityController); //tested

// Route to get activities for a specific project
router.get('/project-activites/:projectId', findActivitiesByProjectController); // tested

// Route to get activities for a specific user
router.get('/user-activites/:userId', findActivitiesByUserController); //tested

// Route to log a file edit activity
router.post('/file-edit-activity', trackFileEditActivityController); 

// Route to log a comment activity
router.post('/comment-activity', trackCommentActivityController);

// Route to get the activity overview of a project
router.get('/overview-activity/:projectId', getActivityOverviewController);


module.exports = router;
