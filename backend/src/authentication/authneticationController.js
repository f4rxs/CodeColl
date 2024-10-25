const authenticationService = require('./authenticationService');

const authenticationController = {
    signinController: async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await authenticationService.signin(email, password);
            if (result) {
                res.status(200).json({ message: 'Authentication successul ', token: result.token, user: result.user });

            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error in authentication user ', error: error.message });
        }
    },
    signupController: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const user = await authenticationService.signup({ username, email, password });
            
            if (user) {
                res.status(201).json({ message: 'User created successfully', user });
            } else {
                res.status(500).json({ message: 'Failed to create user' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error in creating user', error: error.message });
        }
    },
    refreshTokenController: async (req, res) => {
        const { oldToken } = req.body;

        try {
            const newToken = await authenticationService.refreshToken(oldToken);

            res.status(200).json({ message: 'Token refreshed successfully ', token: newToken });

        } catch (error) {
            res.status(500).json({ message: 'Error in refreshing token', error: error.message });
        }
    },
    verifyEmailController: async (req, res) => {
        const { id, token } = req.params;  
        try {
            const response = await authenticationService.verifyEmail(id, token); 
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ message: 'Email verification failed', error: error.message });
        }
    },
    resetPasswordController: async (req, res) => {
        const { email } = req.body;
        try {
            const response = await authenticationService.resetPassword(email);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ message: `Password reset failed`, error: error.message });
        }
    }
    
}

module.exports = authenticationController;