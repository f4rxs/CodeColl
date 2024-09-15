const User = require('../models/postgresql/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { token, user };
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
};

const registerUser = async (userData) => {
    try {

        const { username, email, password, profile_pic, bio, skills } = userData;


        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            throw new Error(`Email ${email} is already in use`);
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            username,
            email,
            password_hash: hashedPassword,
            profile_pic,
            bio,
            skills
        });

        return newUser;
    } catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
};

const refreshToken = async (oldToken) => {
    try {
        const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);
        const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return newToken;
    } catch (error) {
        throw new Error(`Error refreshing token: ${error.message}`);
    }
};

const getUserProfile = async (userId) => {
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
};


const findUserById = async (userId) => {
    try {
        return await User.findByPk(userId);
    } catch (error) {
        throw new Error(`no user found with id ${userId}`);
    }
};

const findAllUsers = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        throw new Error(`no users found`);
    }
}

const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`user with id ${userId} is not found`);
        }
        return await User.update(updateData)
    } catch (error) {
        throw new Error(`Erorr in updating the user with ${userId}`);
    }
};

const updateUserEmail = async (userId, newEmail) => {
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
};

const updateUserProfilePic = async (userId, profilePicUrl) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} is not found`);
        }
        return await user.update({ profile_pic: profilePicUrl });
    } catch (error) {
        throw new Error(`Failed to update the user's profile picture: ${error.message}`);
    }
};

const updateUserBio = async (userId, newBio) => {
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
};

const updateUSerSkills = async (userId, newSkills) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} is not found`);
        }
        return await user.update({ skills: newSkills });
    } catch (error) {
        throw new Error(`failed to update the user's skills : ${error.message}`);
    }
};

const changeUserPassword = async (userId, newPassword) => {
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
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return await user.destroy();
    } catch (error) {
        throw new Error(`Error in deleting the user with ID ${userId}`);
    }
};

const searchUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`user with id ${userId} is not found`);
        }
        return user;
    } catch (error) {
        throw new Error(`Error in finding the user with id ${userId}`);
    }
};

const searchUserByUsername = async (userName) => {
    try {
        const user = await User.findOne({ where: { username: userName } });
        if (!user) {
            throw new Error(`User with username ${userName} not found`);
        }
        return user;
    } catch (error) {
        throw new Error(`Error in finding the user with username ${userName}`);
    }
};

const searchUserByEmail = async (userEmail) => {
    try {
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            throw new Error(`User with the email ${userEmail} not found`);
        }
        return user;
    } catch (err) {
        throw new Error(`Error in findin the user with the email ${userEmail}`);
    }
};

const resetPassword = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error(`No user found with email ${email}`);
        }

        const resetToken = crypto.randomBytes(32).toString('hex');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Password Reset',
            text: `Please use the following token to reset your password: ${resetToken}`
        };

        await transporter.sendMail(mailOptions);
        return resetToken;
    } catch (error) {
        throw new Error(`Error resetting password: ${error.message}`);
    }
};


const generateEmailConfirmationToken = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        const token = crypto.randomBytes(32).toString('hex');
        await user.update({ confirmation_token: token });

        return token;
    } catch (error) {
        throw new Error(`Error generating confirmation token: ${error.message}`);
    }
};

const confirmEmail = async (email, token) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error(`No user found with email ${email}`);
        }

        if (user.confirmation_token !== token) {
            throw new Error('Invalid confirmation token');
        }

        return await user.update({ confirmation_token: null, email_verified: true });
    } catch (error) {
        throw new Error(`Error confirming email: ${error.message}`);
    }
};

module.exports = {
    authenticateUser, registerUser,
    getUserProfile,
    refreshToken, findUserById,
    findAllUsers, updateUser,
    updateUserBio, updateUSerSkills,
    changeUserPassword, updateUserEmail,
    deleteUser, searchUserById,
    searchUserByUsername, searchUserByEmail,
    resetPassword, generateEmailConfirmationToken
    , confirmEmail, updateUserProfilePic
};