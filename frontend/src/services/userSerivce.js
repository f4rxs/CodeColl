import httpCommon from "../http-common";
import { getToken, getTokenBearer } from '../utils/utils';

// Get user by ID
const getUserById = (userId) => {
    return httpCommon.get(`/users/${userId}`, {
        headers: { Authorization: getTokenBearer() }
    });
};

const getUserByIds = async (userIds) => {
    const response = await httpCommon.post(
        '/users/all/details',
        { userIds }, // Send `userIds` in the request body
        { headers: { Authorization: getTokenBearer() } } 
    );
    return response.data;
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
const searchUserByUsername = (term) => {
    return httpCommon.get(`/users/search/${term}`, {
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
const updateUserProfilePic = async (userId, profilePicFile) => {
    const formData = new FormData();
    formData.append('profile_pic', profilePicFile);  
    try {
        const response = await httpCommon.put(`/users/profile-pic/${userId}`, formData, {
            headers: {
                'Authorization': getTokenBearer(),
                'Content-Type': 'multipart/form-data', 
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error uploading profile picture:', error);
    }
};
const updateUser = (userId, updatedData) => {
    return httpCommon.put(`/users/${userId}`, updatedData, {
        headers: { Authorization: getTokenBearer() }
    });
}

// Delete user
const deleteUser = (userId) => {
    return httpCommon.delete(`/users/${userId}`, {
        headers: { Authorization: getTokenBearer() }
    });
};

const userService = {
    getUserById,
    getUserByIds,
    getAllUsers,
    searchUserByEmail,
    searchUserByUsername,
    updateUserBio,
    updateUserSkills,
    changeUserPassword,
    updateUserEmail,
    updateUserProfilePic,
    deleteUser,
    updateUser
};

export default userService;
