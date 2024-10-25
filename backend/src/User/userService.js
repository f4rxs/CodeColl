const User = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const userService = {
    getUserProfile: async (userId) => {
        try {
            const user = await User.findByPk(userId, {
                include: ['projects', 'collaborators']
            });
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error retrieving user profile: ${error.message}`);
        }
    },
    findAllUsers: async () => {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error(`no users found`);
        }
    },
    updateUser: async (userId, updateData) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with id ${userId} is not found`);
            }

            await User.update(updateData, {
                where: { id: userId }
            });

            return await User.findByPk(userId);
        } catch (error) {
            throw new Error(`Error in updating the user with id ${userId}: ${error.message}`);
        }
    },
// when the user updates his/her email it should send a verification
    updateUserEmail: async (userId, newEmail) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`user with id ${userId} is not found`);
            }
            const emailExists = await User.findOne({ where: { email: newEmail } });
            if (emailExists) {
                throw new Error(`Email ${newEmail} is already in use`);
            }
            return await user.update({ email: newEmail });
        } catch (error) {
            throw new Error(`Error in updating user email ${error.message}`);
        }
    },

    updateUserProfilePic: async (userId, profilePicUrl) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} is not found`);
            }
            return await user.update({ profile_pic: profilePicUrl });
        } catch (error) {
            throw new Error(`Failed to update the user's profile picture: ${error.message}`);
        }
    },

    updateUserBio: async (userId, newBio) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} is not found`);
            }
            // Update the bio field
            return await user.update({ bio: newBio });


        } catch (error) {
            throw new Error(`Failed to update the user's bio: ${error.message}`);
        }
    },

    updateUSerSkills: async (userId, newSkills) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} is not found`);
            }
            return await user.update({ skills: newSkills });
        } catch (error) {
            throw new Error(`failed to update the user's skills : ${error.message}`);
        }
    },

    changeUserPassword: async (userId, newPassword) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            return await user.update({ password_hash: hashedPassword });
        } catch (error) {
            throw new Error(`Error changing user password: ${error.message}`);
        }
    },

    deleteUser: async (userId) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return await user.destroy();
        } catch (error) {
            throw new Error(`Error in deleting the user with ID ${userId}`);
        }
    },

    searchUserById: async (userId) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`user with id ${userId} is not found`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error in finding the user with id ${userId}`);
        }
    },
    searchUserByUsername: async (userName) => {
        try {
            const user = await User.findOne({ where: { username: userName } });
            if (!user) {
                throw new Error(`User with username ${userName} not found`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error in finding the user with username ${userName}`);
        }
    },
    searchUserByEmail: async (userEmail) => {
        try {
            const user = await User.findOne({ where: { email: userEmail } });
            if (!user) {
                throw new Error(`User with the email ${userEmail} not found`);
            }
            return user;
        } catch (err) {
            throw new Error(`Error in findin the user with the email ${userEmail}`);
        }
    },
   
}


module.exports = userService;