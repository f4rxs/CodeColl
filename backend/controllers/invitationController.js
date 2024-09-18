const {
    sendInvitation,
    findInvitationsByUser,
    respondToInvitation,
    cancelInvitation,
    findAllPendingInvitations
} = require('../services/invitationService');

const sendInvitationController = async (req, res) => {
    const { userId: user_id, projectId : project_id, role } = req.body;
    try {
        const invitation = await sendInvitation(user_id, project_id, role);
        res.status(201).json(invitation);
    } catch (error) {
        res.status(400).json({ message: 'Error sending invitation', error: error.message });
    }
};

const findInvitationsByUserController = async (req, res) => {
    const { userId } = req.params;
    try {
        const invitations = await findInvitationsByUser(userId);
        res.status(200).json(invitations);
    } catch (error) {
        res.status(404).json({ message: 'Error finding invitations', error: error.message });
    }
};

const respondToInvitationController = async (req, res) => {
    const { invitationId } = req.params;
    const { accepted } = req.body;
    try {
        const result = await respondToInvitation(invitationId, accepted);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error responding to invitation', error: error.message });
    }
};

const cancelInvitationController = async (req, res) => {
    const { invitationId } = req.params;
    try {
        const result = await cancelInvitation(invitationId);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'Error canceling invitation', error: error.message });
    }
};

const findAllPendingInvitationsController = async (req, res) => {
    try {
        const invitations = await findAllPendingInvitations();
        res.status(200).json(invitations);
    } catch (error) {
        res.status(404).json({ message: 'Error finding pending invitations', error: error.message });
    }
};

module.exports = {
    sendInvitationController,
    findInvitationsByUserController,
    respondToInvitationController,
    cancelInvitationController,
    findAllPendingInvitationsController
};