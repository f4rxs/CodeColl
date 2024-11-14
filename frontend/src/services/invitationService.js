// invitationService.js
import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

const sendInvitation = (inviteeId, projectId, message) => {
    return httpCommon.post('/invitation',
        { inviteeId, projectId, message },
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

const findInvitationForUser = (userId) => {
    return httpCommon.get(`/invitation/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};


const findAllPendingInvitations = () => {
    return httpCommon.get('/invitation/pending',
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
};

const respondToInvitation = (invitationId, response) => {
    return httpCommon.put(`/invitation/${invitationId}/respond`,
        { response },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
};

const cancelInvitation = (invitationId) => {
    return httpCommon.delete(`/invitation/${invitationId}`,
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
    cancelInvitation,
    findInvitationForUser
};

export default invitationService;
