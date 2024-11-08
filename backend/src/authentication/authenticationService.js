const User = require('../User/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailingService = require('../mailing/mailingService');


const authenticationService = {
    signup: async (userData) => {
        try {
            const { username, email, password } = userData;

            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error(`Email ${email} is already in use`);
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                username,
                email,
                password_hash: hashedPassword,
            });

            const verificationToken = crypto.randomBytes(32).toString('hex');
            await newUser.update({ confirmation_token: verificationToken });
            await mailingService.sendVerificationMail(newUser.email, newUser.id, verificationToken);

            return newUser;
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    },

    signin: async (email, password) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error(`Email ${email} is invalid`);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                throw new Error(`Invalid password for email ${email}`);
            }

            if (!user.email_verified) {
                throw new Error('Email not verified');
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            return { token, refreshToken, user };
        } catch (error) {
            throw new Error(`Authentication failed: ${error.message}`);
        }
    },

    refreshToken: async (oldToken) => {
        try {
            const decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET);
            const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return newToken;
        } catch (error) {
            throw new Error(`Error refreshing token: ${error.message}`);
        }
    },

    verifyEmail: async (id, token) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('No user found with this ID');
            }

            if (user.confirmation_token !== token) {
                throw new Error('Invalid or expired token');
            }

            await user.update({ email_verified: true, confirmation_token: null });
            return { message: 'Email verified successfully' };
        } catch (error) {
            throw new Error(`Error verifying email: ${error.message}`);
        }
    },

    checkEmailVerification: async (id) => {
        try {
            const user = await User.findOne({ where: { id } }); 
                
            
            if (!user) {
                throw new Error('User not found');
            }
            
            return user.email_verified; 
            
        } catch (error) {
            throw new Error('Error checking email verification status');
        }
    },


    resetPassword: async (email) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('No user found with this email');
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            await user.update({ reset_token: resetToken });

            await mailingService.sendResetPasswordMail(user.email, resetToken);
            return { message: 'Password reset email sent' };
        } catch (error) {
            throw new Error(`Error resetting password: ${error.message}`);
        }
    },


}

module.exports = authenticationService;