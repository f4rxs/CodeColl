const fileService = require('../File/fileService');
const userService = require('./userService');
const path = require('path');
const {uploadImageToImgBB} = require('../User/imageService');
const fs = require('fs');

const userController = {
    getUserProfileController: async (req, res) => {
        const userId = req.params.id;
        try {
            const userProfile = await userService.getUserProfile(userId);
            if (userProfile) {
                res.status(200).json(userProfile);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error in retrieving user profile ', error: error.message });
        }
    },

    updateUserBioController: async (req, res) => {
        const userId = req.params.id;
        const { newBio } = req.body;
        
        try {
            const result = await userService.updateUserBio(userId,newBio);
       

            if (result) {
                res.status(200).json({ message: `User with id ${userId} has updated the bio`, user: result });
            } else {
                res.status(500).json({ message: 'Failed to update the user bio' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error in updating bio ', error: error.message });
        }
    },

    updateUSerSkillsController: async (req, res) => {
        const userId = req.params.id;
        const { newSkills } = req.body;
        try {
            const result = await userService.updateUSerSkills(userId,newSkills);
            if (result) {
                res.status(200).json({ message: `Skills for the user with id ${userId} are updated`, user: result })
            } else {
                res.status(500).json({ message: 'Failed to update skills' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error in updating skills ', error: error.message });
        }
    },
    
    changeUserPasswordController: async (req, res) => {
        const userId = req.params.id;
        const { newPassword } = req.body;
        try {
            const result = await userService.changeUserPassword(userId, newPassword);
            if (result) {
                res.status(200).json({ message: 'Password updated successfully', user: result });
            } else {
                res.status(500).json({ message: 'Failed to update password' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating password', error: error.message });
        }
    },

    getUserByIdController: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await userService.searchUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    },


    getUsersByIdsController: async (req, res) => {
        const { userIds } = req.body; 
        try {
            const users = await userService.searchUsersByIds(userIds);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },

    findAllUsersController: async (req, res) => {
        try {
            const users = await userService.findAllUsers();
            if (users && users.length > 0) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: 'No users found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },

    updateUserController: async (req, res) => {
        const userId = req.params.id;
        const updatedData = req.body;

        const profilePicPath = req.file ? req.file.path : null;
        try {
            const user = await userService.updateUser(userId, updatedData,profilePicPath);
            if (user) {
                res.status(200).json({ message: 'User updated successfully', user });
            } else {
                res.status(500).json({ message: 'Failed to update user' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        } finally {
            if(profilePicPath && fs.existsSync(profilePicPath)){
                fs.unlinkSync(profilePicPath);
            }
        }
    },

    deleteUserController: async (req, res) => {
        const userId = req.params.id;
        try {
            const result = await userService.deleteUser(userId);
            if (result) {
                res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
            } else {
                res.status(500).json({ message: `Failed to delete user with ID ${userId}` });
            }
        } catch (error) {
            res.status(500).json({ message: `Error deleting user with ID ${userId}`, error: error.message });
        }
    },

    updateUserEmailController: async (req, res) => {
        const userId = req.params.id;
        const { newEmail } = req.body;
        try {
            const result = await userService.updateUserEmail(userId, newEmail);
            if (result) {
                res.status(200).json({ message: `Email updated successfully for user with ID ${userId}` });
            } else {
                res.status(500).json({ message: `Failed to update email for user with ID ${userId}` });
            }
        } catch (error) {
            res.status(500).json({ message: `Error updating email for user with ID ${userId}`, error: error.message });
        }
    },

    searchUserByEmailController: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await userService.searchUserByEmail(email);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error searching for user', error: error.message });
        }
    },

    searchUserByUsernameController: async (req, res) => {
        const { term } = req.params;  
        try {
            const users = await userService.searchUserByUsername(term);
            if (users.length > 0) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: `User with username "${term}" not found` });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error searching for user', error: error.message });
        }
    },
    
    updateUserProfilePicController: async (req, res) => {
        const userId = req.params.id;
        console.log('Uploaded file:', req.file);
        const profilePicPath = req.file ? req.file.path : null; 
        if (!profilePicPath) {
            return res.status(400).json({ message: 'No profile picture file provided' });
        }
    
        try {

            const profilePicUrl = await uploadImageToImgBB(profilePicPath);
            
            // Update user profile picture in the database
            const result = await userService.updateUserProfilePic(userId, profilePicUrl);
    
            if (result) {
                res.status(200).json({ message: `Profile picture updated successfully for user with ID ${userId}` });
            } else {
                res.status(500).json({ message: `Failed to update profile picture for user with ID ${userId}` });
            }
        } catch (error) {
            res.status(500).json({ message: `Error updating profile picture for user with ID ${userId}`, error: error.message });
        } finally {
            // Clean up the uploaded file after processing
            if (profilePicPath && fs.existsSync(profilePicPath)) {
                fs.unlinkSync(profilePicPath);
            }
        }
    },
    

}


module.exports = userController;
