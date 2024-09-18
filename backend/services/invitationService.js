const Invitation = require('../models/postgresql/invitation'); 
const Project = require('../models/postgresql/project'); 
const User = require('../models/postgresql/user'); 

// Service to send an invitation
const sendInvitation = async (invitationData) => {
    const { project_id, user_id } = invitationData;

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            throw new Error('User not found');
        }

        
        const project = await Project.findByPk(project_id);
        if (!project) {
            throw new Error('Project not found');
        }

        const invitation = await Invitation.create({
            project_id,
            user_id,
            status: 'pending'
        });

        return invitation;
    } catch (error) {
        throw new Error(`Error sending invitation: ${error.message}`);
    }
};

const findInvitationsByUser = async (userId) => {
    try {
        const invitations = await Invitation.findAll({
            where: { user_id: userId },
            include: ['project'] 
        });

        return invitations;
    } catch (error) {
        throw new Error(`Error finding invitations for user ${userId}: ${error.message}`);
    }
};

const respondToInvitation = async (invitationId, response) => {
    try {
        const invitation = await Invitation.findByPk(invitationId);

        if (!invitation) {
            throw new Error('Invitation not found');
        }

        if (!['accepted', 'rejected'].includes(response)) {
            throw new Error('Invalid response');
        }

        invitation.status = response;
        await invitation.save();

        return invitation;
    } catch (error) {
        throw new Error(`Error responding to invitation ${invitationId}: ${error.message}`);
    }
};

// Service to cancel an invitation
const cancelInvitation = async (invitationId) => {
    try {
        const invitation = await Invitation.findByPk(invitationId);

        if (!invitation) {
            throw new Error('Invitation not found');
        }

        await invitation.destroy();

        return { message: 'Invitation cancelled' };
    } catch (error) {
        throw new Error(`Error cancelling invitation ${invitationId}: ${error.message}`);
    }
};

// Service to find all pending invitations
const findAllPendingInvitations = async () => {
    try {
        const pendingInvitations = await Invitation.findAll({
            where: { status: 'pending' },
            include: ['project', 'user'] 
        });

        return pendingInvitations;
    } catch (error) {
        throw new Error(`Error finding pending invitations: ${error.message}`);
    }
};

module.exports = {
    sendInvitation,
    findInvitationsByUser,
    respondToInvitation,
    cancelInvitation,
    findAllPendingInvitations
};
