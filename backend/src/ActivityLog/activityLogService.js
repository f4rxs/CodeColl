const userService = require('../User/userService');
const ActivityLog = require('./activityLog');

const logActivityService = {
     logActivity : async (userId, projectId, action) => {
        try {
            const newActivity = await ActivityLog.create({
                user_id: userId,
                project_id: projectId,
                action
            });
            return newActivity;
        } catch (error) {
            throw new Error(`Error logging activity: ${error.message}`);
        }
    },
    findActivitiesByProject: async (projectId) => {
        try {
            const activities = await ActivityLog.findAll({
                where: { project_id: projectId }
            });
    
            if (activities.length === 0) {
                throw new Error(`No activities found for project with ID ${projectId}`);
            }
    
            const activitiesWithUsernames = await Promise.all(
                activities.map(async (activity) => {
                    const user = await userService.searchUserById(activity.dataValues.user_id);
                    return {
                        ...activity.dataValues,
                        username: user ? user.username : "Unknown User"
                    };
                })
            );
    
            return activitiesWithUsernames;
        } catch (error) {
            throw new Error(`Error finding activities for project ${projectId}: ${error.message}`);
        }
    },
    
    
     findActivitiesByUser : async (userId) => {
        try {
            const activities = await ActivityLog.findAll({
                where: { user_id: userId }
            });
    
            if (activities.length === 0) {
                throw new Error(`No activities found for user with ID ${userId}`);
            }
    
            return activities;
        } catch (error) {
            throw new Error(`Error finding activities for user ${userId}: ${error.message}`);
        }
    },
    
    
     trackFileEditActivity : async (userId, projectId, fileName) => {
        try {
            const action = `Edited file: ${fileName}`;
            return await logActivity(userId, projectId, action);
        } catch (error) {
            throw new Error(`Error tracking file edit activity: ${error.message}`);
        }
    },
    
    
     trackCommentActivity : async (userId, projectId, comment) => {
        try {
            const action = `Commented: "${comment}"`;
            return await logActivity(userId, projectId, action);
        } catch (error) {
            throw new Error(`Error tracking comment activity: ${error.message}`);
        }
    },
    
     getActivityOverview : async (projectId) => {
        try {
            const activities = await findActivitiesByProject(projectId);
    
            const overview = {
                totalActivities: activities.length,
                actions: activities.map(activity => ({
                    userId: activity.user_id,
                    action: activity.action,
                    timestamp: activity.createdAt
                }))
            };
    
            return overview;
        } catch (error) {
            throw new Error(`Error getting activity overview for project ${projectId}: ${error.message}`);
        }
    }
    
}



module.exports = logActivityService;