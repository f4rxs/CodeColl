import httpCommon from "../http-common";
import { getToken } from '../utils/utils';



const signin = (data) => {
    return httpCommon.post('/auth/signin', data);
}

const signup = (data) => {
    return httpCommon.post('/auth/signup', data);
}
const emailVerification = (id, token) => {
    // return httpCommon.get(`/auth/verify-email/${id}/${token}`);
    const response = httpCommon.get(`/auth/verify-email/${id}/${token}`);
    return response.data;


};

const checkEmailVerification = (userId) => {
    return httpCommon.post('/auth/check-email-verification', { userId });
}

const refreshToken = () => {
    return httpCommon.post('/auth/refresh-token', {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

const authenticationService = {
    signin,
    signup,
    refreshToken,
    emailVerification,
    checkEmailVerification
};


export default authenticationService;
