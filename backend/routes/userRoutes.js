const express = require('express');
const {
    registerUserController,
    getUserByIdController,
    findAllUsersController,
    updateUserController,
    deleteUserController,
    updateUserEmailController,
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
    generateEmailConfirmationTokenController,
    updateUserProfilePicController
} = require('../controllers/userController');

const router = express.Router();

// User Registration
router.post('/user', registerUserController); // tested

// Get User by ID
router.get('/user/:id', getUserByIdController); // tested

// Get All Users
router.get('/users', findAllUsersController); // tested

// Update User
router.put('/user/:id', updateUserController);

// Update User Email
router.put('/user/changeEmail/:id', updateUserEmailController);  //tested

// Delete User
router.delete('/user/:id', deleteUserController); // tested

// Authenticate User
router.post('/auth/login', authenticateUserController); //tested

// Refresh Token
router.post('/auth/refresh-token', refreshTokenController); //tested

// Get User Profile
router.get('/user/profile/:id', getUserProfileController); //("Error retrieving user profile: Argument passed to findByPk is invalid: [object Object]")

// Update User Bio
router.put('/user/bio/:id', updateUserBioController); // ("Failed to update the user's bio: invalid input syntax for type integer: \"UOB computer Sceince\"")


// Update User Skills
router.put('/user/skills/:id', updateUSerSkillsController); //same error above

// Change User Password
router.put('/user/change-password/:id', changeUserPasswordController); //tested

// Reset Password
router.post('/user/reset-password', resetPasswordController); //"error": "Error resetting password: Missing credentials for \"PLAIN\""

// Confirm Email
router.post('/user/confirm-email', confirmEmailController); // idk why the token i am getting is invalid

// Search User by Email
router.get('/user/search/email', searchUserByEmailController); //tested

// Search User by Username
router.get('/user/search/username', searchUserByUsernameController); //tested
 
// Generate Email Confirmation Token
router.post('/user/confirmation-token/:userId', generateEmailConfirmationTokenController);//tested

// Update User Profile Picture
router.put('/user/profile-pic/:id', updateUserProfilePicController); // tested (might implement a logic to actually get real images)

module.exports = router;
