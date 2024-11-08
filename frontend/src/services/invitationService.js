// invitationService.js
import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

const sendInvitation = (inviteeId, projectId) => {
    return httpCommon.post('/invitations', 
    { inviteeId, projectId }, 
    {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const findInvitationsByUser = (inviterId) => {
    return httpCommon.get(`/invitation/${inviterId}`, 
    {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const findAllPendingInvitations = () => {
    return httpCommon.get('/invitations/pending', 
    {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const respondToInvitation = (invitationId, response) => {
    return httpCommon.put(`/invitations/${invitationId}/respond`, 
    { response }, 
    {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const cancelInvitation = (invitationId) => {
    return httpCommon.delete(`/invitations/${invitationId}`, 
    {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const invitationService = {
    sendInvitation,
    findInvitationsByUser,
    findAllPendingInvitations,
    respondToInvitation,
    cancelInvitation
};

export default invitationService;
