const { authenticateUser, registerUser,
    getUserProfile,
    refreshToken, findUserById,
    findAllUsers, updateUser,
    updateUserBio, updateUSerSkills,
    changeUserPassword, updateUserEmail,
    deleteUser, searchUserById,
    searchUserByUsername, searchUserByEmail,
    resetPassword, generateEmailConfirmationToken
    , confirmEmail, updateUserProfilePic } = require('../services/userService');


const authenticateUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authenticateUser(email, password);
        if (result) {
            res.status(200).json({ message: 'Authentication successul ', token: result.token, user: result.user });

        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in authentication user ', error: error.message });
    }
};

const refreshTokenController = async (req, res) => {
    const { oldToken } = req.body;

    try {
        const newToken = await refreshToken(oldToken);
        res.status(200).json({ message: 'Token refreshed successfully ', token: newToken });

    } catch (error) {
        res.status(500).json({ message: 'Error in refreshing token', error: error.message });
    }

};

const getUserProfileController = async (req, res) => {
    const userId = req.params;
    try {
        const userProfile = await getUserProfile(userId);
        if (userProfile) {
            res.status(200).json(userProfile);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in retrieving user profile ', error: error.message });
    }
};

const updateUserBioController = async (req, res) => {
    const userId = req.params;
    const { newBio } = req.body;
    try {
        const result = await updateUserBio(newBio);
        if (result) {
            res.status(200).json({ message: `User with id ${userId} has updated the bio`, user: result });
        } else {
            res.status(500).json({ message: 'Failed to update the user bio' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in updating bio ', error: error.message });
    }
};

const updateUSerSkillsController = async (req, res) => {
    const userId = req.params;
    const { newSkills } = req.body;
    try {
        const result = await updateUSerSkills(newSkills);
        if (result) {
            res.status(200).json({ message: `Skills for the user with id ${userId} are updated`, user: result })
        } else {
            res.status(500).json({ message: 'Failed to update skills' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in updating skills ', error: error.message });
    }
};

const changeUserPasswordController = async (req, res) => {
    const userId = req.params.id;
    const { newPassword } = req.body;
    try {
        const result = await changeUserPassword(userId, newPassword);
        if (result) {
            res.status(200).json({ message: 'Password updated successfully', user: result });
        } else {
            res.status(500).json({ message: 'Failed to update password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error: error.message });
    }
};

const resetPasswordController = async (req, res) => {
    const { email } = req.body;
    try {
        const resetToken = await resetPassword(email);
        res.status(200).json({ message: 'Password reset token generated', token: resetToken });
    } catch (error) {
        res.status(500).json({ message: 'Error generating password reset token', error: error.message });
    }
};

const confirmEmailController = async (req, res) => {
    const { email, token } = req.body;
    try {
        const result = await confirmEmail(email, token);
        if (result) {
            res.status(200).json({ message: 'Email confirmed successfully' });
        } else {
            res.status(400).json({ message: 'Invalid token or email' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error confirming email', error: error.message });
    }
};

// Register User
const registerUserController = async (req, res) => {
    const { username, email, password, profile_pic, bio, skills } = req.body;
    try {
        const user = await registerUser({ username, email, password, profile_pic, bio, skills });
        if (user) {
            res.status(201).json({ message: 'User created successfully', user });
        } else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in creating user', error: error.message });
    }
};

// Get User by ID
const getUserByIdController = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await searchUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Get All Users
const findAllUsersController = async (req, res) => {
    try {
        const users = await findAllUsers();
        if (users && users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Update User
const updateUserController = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    try {
        const user = await updateUser(userId, updatedData);
        if (user) {
            res.status(200).json({ message: 'User updated successfully', user });
        } else {
            res.status(500).json({ message: 'Failed to update user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete User
const deleteUserController = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await deleteUser(userId);
        if (result) {
            res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
        } else {
            res.status(500).json({ message: `Failed to delete user with ID ${userId}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error deleting user with ID ${userId}`, error: error.message });
    }
};

// Update User Email
const updateUserEmailController = async (req, res) => {
    const userId = req.params.id;
    const { newEmail } = req.body;
    try {
        const result = await updateUserEmail(userId, newEmail);
        if (result) {
            res.status(200).json({ message: `Email updated successfully for user with ID ${userId}` });
        } else {
            res.status(500).json({ message: `Failed to update email for user with ID ${userId}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error updating email for user with ID ${userId}`, error: error.message });
    }
};

const searchUserByEmailController = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await searchUserByEmail(email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error searching for user', error: error.message });
    }
};

const searchUserByUsernameController = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await searchUserByUsername(username);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error searching for user', error: error.message });
    }
};

const generateEmailConfirmationTokenController = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed as a route parameter
    try {
        const token = await generateEmailConfirmationToken(userId);
        res.status(200).json({ message: 'Confirmation token generated successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error generating confirmation token', error: error.message });
    }
};

// Update User Profile Picture
const updateUserProfilePicController = async (req, res) => {
    const userId = req.params.id;
    const { profile_pic } = req.body;
    try {
        const result = await updateUserProfilePic(userId, profile_pic);
        if (result) {
            res.status(200).json({ message: `Profile picture updated successfully for user with ID ${userId}` });
        } else {
            res.status(500).json({ message: `Failed to update profile picture for user with ID ${userId}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error updating profile picture for user with ID ${userId}`, error: error.message });
    }
};

module.exports = {
    registerUserController,
    getUserByIdController,
    findAllUsersController,
    updateUserController,
    deleteUserController,
    updateUserEmailController,
    updateUserProfilePicController,
    authenticateUserController,
    refreshTokenController,
    getUserProfileController,
    updateUserBioController,
    updateUSerSkillsController,
    changeUserPasswordController,
    resetPasswordController,
    confirmEmailController,
    searchUserByEmailController,
    searchUserByUsernameController,
    generateEmailConfirmationTokenController

};
