const Invitation = require('../Invitation/invitation');
const Project = require('../Project/project');
const User = require('../User/user');
const Collaborator = require('../ProjectCollaborator/projectCollaborators');

const invitationService = {
    sendInvitation: async (inviterId, inviteeId, projectId, message) => {
        try {
            const invitee = await User.findByPk(inviteeId);
            if (!invitee) {
                throw new Error('Invitee not found');
            }

            const project = await Project.findByPk(projectId);
            if (!project) {
                throw new Error('Project not found');
            }

            const invitation = await Invitation.create({
                inviter_id: inviterId,
                invitee_id: inviteeId,
                project_id: projectId,
                message,
                status: 'pending'
            });

            return invitation;
        } catch (error) {
            throw new Error(`Error sending invitation: ${error.message}`);
        }
    },
    findInvitationsByUser: async (inviterId) => {
        try {
            const invitations = await Invitation.findAll({
                where: { inviter_id: inviterId },
                include: [
                    { model: Project, as: 'project' },
                    { model: User, as: 'inviteeUser' }
                ]
            });

            if (invitations.length === 0) {
                throw new Error(`No invitations found`)
            }

            return invitations;
        } catch (error) {
            throw new Error(`Error finding invitations for user ${inviterId}: ${error.message}`);
        }
    },

     findPendingInvitationForUser : async (userId) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`No user found with the id ${userId}`);
            }
            
            const result = await Invitation.findAll({
                where: {
                    invitee_id: userId,  // Ensure the field name matches the DB column
                    status: 'pending'
                }
            });
    
            return result;
        } catch (error) {
            throw new Error(`Error fetching invitations for the user with the id ${userId}: ${error.message}`);
        }
    },

    respondToInvitation: async (invitationId, response) => {
        try {
            const invitation = await Invitation.findByPk(invitationId);
            if (!invitation) throw new Error(`Invitation with ID ${invitationId} not found`);

            if (response === 'accepted') {
                await invitation.update({ status: 'accepted' });

                // Check if the collaborator already exists to avoid primary key conflict
                const existingCollaborator = await Collaborator.findOne({
                    where: {
                        user_id: invitation.invitee_id,
                        project_id: invitation.project_id
                    }
                });

                if (existingCollaborator) {
                    throw new Error('Collaborator already exists for this project and user');
                }

                // Create the collaborator entry
                try {
                    const collaborator = await Collaborator.create({
                        user_id: invitation.invitee_id,
                        project_id: invitation.project_id,
                        role: 'Collaborator',
                        permissions: {
                            "can_edit": false,
                            "can_lock_files": false,
                            "can_manage_collaborators": false
                        }
                    });
                    return collaborator;
                } catch (collabError) {
                    throw new Error(`Collaborator creation failed: ${collabError.message}`);
                }
            } else if (response === 'rejected') {
                // await invitation.update({ status: 'rejected' });
                await invitation.destroy();
                return {message:'Inviation Cancelled'};
            }

            return invitation;
        } catch (error) {
            throw new Error(`Error responding to invitation: ${error.message}`);
        }
    },
    // Service to cancel an invitation
    cancelInvitation: async (invitationId) => {
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
    },

    // Service to find all pending invitations
    findAllPendingInvitations: async () => {
        try {
            const pendingInvitations = await Invitation.findAll({
                where: { status: 'pending' },
                include: [
                    { model: Project, as: 'project' },
                    { model: User, as: 'inviterUser' }  // assuming 'inviterUser' alias for inviter in Invitation model
                ]
            });
            if (pendingInvitations.length === 0) {
                throw new Error(`No pending invitation`);
            }
            return pendingInvitations;
        } catch (error) {
            throw new Error(`Error finding pending invitations: ${error.message}`);
        }
    }
}



module.exports = invitationService;
