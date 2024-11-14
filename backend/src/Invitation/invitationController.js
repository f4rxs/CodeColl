const invitationService = require('./invitationService');

const invationController = {
    sendInvitationController: async (req, res) => {
        const { inviteeId, projectId, message } = req.body;
        const inviterId = req.user.id;

        try {
            const invitation = await invitationService.sendInvitation(inviterId, inviteeId, projectId, message);
            res.status(201).json(invitation);
        } catch (error) {
            res.status(400).json({ message: 'Error sending invitation', error: error.message });
        }
    },

    findInvitationsByUserController: async (req, res) => {
        const { inviterId } = req.params;
        try {

            const invitations = await invitationService.findInvitationsByUser(inviterId);

            res.status(200).json(invitations);
        } catch (error) {
            res.status(404).json({ message: 'Error finding invitations', error: error.message });
        }
    },
 findPendingInvitationForUserController : async (req, res) => {
    try {
        const { inviteeId } = req.params;
        
        if (!inviteeId) {
            return res.status(400).json({ message: 'Invitee ID is required' });
        }

        const invitations = await invitationService.findPendingInvitationForUser(inviteeId);
        
        // Check if any invitations are found
        if (invitations.length === 0) {
            return res.status(404).json({ message: `No invitations found for user with id ${inviteeId}` });
        }
        
        return res.status(200).json(invitations); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invitations', error: error.message });
    }
},

    respondToInvitationController: async (req, res) => {
        const { invitationId } = req.params;
        const { response } = req.body;
        try {
            const result = await invitationService.respondToInvitation(invitationId, response);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: 'Error responding to invitation', error: error.message });
        }
    },

    cancelInvitationController: async (req, res) => {
        const { invitationId } = req.params;
        try {
            const result = await invitationService.cancelInvitation(invitationId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: 'Error canceling invitation', error: error.message });
        }
    },

    findAllPendingInvitationsController: async (req, res) => {
        try {
            const invitations = await invitationService.findAllPendingInvitations();
            res.status(200).json(invitations);
        } catch (error) {
            res.status(404).json({ message: 'Error finding pending invitations', error: error.message });
        }
    }
}



module.exports = invationController;