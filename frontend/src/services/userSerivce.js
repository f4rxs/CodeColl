import httpCommon from "../http-common";
import { getTokenBearer } from '../utils/utils';

// Get user by ID
const getUserById = (userId) => {
    return httpCommon.get(`/users/${userId}`, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Get all users
const getAllUsers = () => {
    return httpCommon.get('/users', {
        headers: { Authorization: getTokenBearer() }
    });
};

// Search user by email
const searchUserByEmail = (email) => {
    return httpCommon.get('/users/search/email', {
        params: { email },
        headers: { Authorization: getTokenBearer() }
    });
};

// Search user by username
const searchUserByUsername = (username) => {
    return httpCommon.get('/users/search/username', {
        params: { username },
        headers: { Authorization: getTokenBearer() }
    });
};

// Update user bio
const updateUserBio = (userId, newBio) => {
    return httpCommon.put(`/users/bio/${userId}`, { newBio }, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Update user skills
const updateUserSkills = (userId, newSkills) => {
    return httpCommon.put(`/users/skills/${userId}`, { newSkills }, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Change user password
const changeUserPassword = (userId, newPassword) => {
    return httpCommon.put(`/users/change-password/${userId}`, { newPassword }, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Update user email
const updateUserEmail = (userId, newEmail) => {
    return httpCommon.put(`/users/changeEmail/${userId}`, { newEmail }, {
        headers: { Authorization: getTokenBearer() }
    });
};

// Update user profile picture
const updateUserProfilePic = (userId, profilePic) => {
    return httpCommon.put(`/users/profile-pic/${userId}`, { profile_pic: profilePic }, {
        headers: { Authorization: getTokenBearer() }
    });
};


// Delete user
const deleteUser = (userId) => {
    return httpCommon.delete(`/users/${userId}`, {
        headers: { Authorization: getTokenBearer() }
    });
};

const userService = {
    getUserById,
    getAllUsers,
    searchUserByEmail,
    searchUserByUsername,
    updateUserBio,
    updateUserSkills,
    changeUserPassword,
    updateUserEmail,
    updateUserProfilePic,
    deleteUser
};

export default userService;
