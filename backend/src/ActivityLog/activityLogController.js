const logActivityService = require('./activityLogService');

const logActivityController = {
     logActivityController : async (req, res) => {
        const { user_id, project_id, action } = req.body;
        try {
            const activity = await logActivityService.logActivity(user_id, project_id, action);
            res.status(200).json({ message: 'Activity logged successfully', activity });
        } catch (error) {
            res.status(500).json({ message: 'Error logging activity', error: error.message });
        }
    },
     findActivitiesByProjectController : async (req, res) => {
        const { projectId } = req.params;
        try {
            const activities = await logActivityService.findActivitiesByProject(projectId);
            res.status(200).json({ activities });
        } catch (error) {
            res.status(500).json({ message: `Error finding activities for project ${projectId}`, error: error.message });
        }
    },
    
     findActivitiesByUserController : async (req, res) => {
        const { userId } = req.params;
        try {
            const activities = await logActivityService.findActivitiesByUser(userId);
            res.status(200).json({ activities });
        } catch (error) {
            res.status(500).json({ message: `Error finding activities for user ${userId}`, error: error.message });
        }
    },
    
    
     trackFileEditActivityController : async (req, res) => {
        const { userId, projectId, fileName } = req.body;
        try {
            const activity = await logActivityService.trackFileEditActivity(userId, projectId, fileName);
            res.status(200).json({ message: 'File edit activity logged', activity });
        } catch (error) {
            res.status(500).json({ message: 'Error logging file edit activity', error: error.message });
        }
    },
    
     trackCommentActivityController : async (req, res) => {
        const { userId, projectId, comment } = req.body;
        try {
            const activity = await logActivityService.trackCommentActivity(userId, projectId, comment);
            res.status(200).json({ message: 'Comment activity logged', activity });
        } catch (error) {
            res.status(500).json({ message: 'Error logging comment activity', error: error.message });
        }
    },
    
     getActivityOverviewController : async (req, res) => {
        const { projectId } = req.params;
        try {
            const overview = await logActivityService.getActivityOverview(projectId);
            res.status(200).json({ overview });
        } catch (error) {
            res.status(500).json({ message: 'Error getting activity overview', error: error.message });
        }
    }
    
}


module.exports = logActivityController;